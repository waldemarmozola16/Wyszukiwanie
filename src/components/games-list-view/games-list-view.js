import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Grid, PageHeader, Table, Alert, Panel, Row, Col} from 'react-bootstrap'
import GameSearch from '../game-search/game-search'
import GameRanges from '../game-ranges/game-ranges'

import {fetchGames} from '../../state/games'

export default connect(
  state => ({
    games: state.games,
    searchString: state.search.searchString,
    changeRange: state.range.changeRange
  }),
  dispatch => ({
    fetchGamesHelper: () => dispatch(fetchGames()),
  })
)(
  class GamesListView extends React.Component {
    render() {
      const {
        games,
        searchString

      } = this.props

      const searchResults = (
        games.data ?
          games.data.filter(
            game => (game.name.toLowerCase()).includes(searchString.toLowerCase())
          ).map(
            game => (
              <tr key={game.id}>
                <td>
                  <img src={game.image}
                       alt="Zdjęcie gry"
                       height="70"
                  />
                </td>
                <td>
                  <Link to={'game-profile/' + game.id}>
                    {game.name}
                  </Link>
                </td>
                <td>{game.players}</td>
              </tr>
            )
          ) :
          (
            <tr>
              <td colSpan="4">Oczekiwanie na dane gier...</td>
            </tr>
          )
      )

      const rangeResults = (
        games.data ?
          games.data.map(
            game => (
              <tr key={game.id}>
                <td>
                  <img src={game.image}
                       alt="Zdjęcie gry"
                       height="70"
                  />
                </td>
                <td>
                  <Link to={'game-profile/' + game.id}>
                    {game.name}
                  </Link>
                </td>
                <td>{game.players}</td>
              </tr>
            )
          ):
          (
            <tr>
              <td colSpan="4">Oczekiwanie na dane gier...</td>
            </tr>
          )
      )

      return (
        <Grid>
          <PageHeader>Lista gier<br/>
            <small>Poniżej znajdziesz listę dostępnych planszówek</small>
          </PageHeader>

          <Panel>
            <Row>
              <Col xs={5}>
                <GameSearch/>
              </Col>
              <Col xs={5}>
                <GameRanges/>
              </Col>
            </Row>
          </Panel>
          {
            searchResults.length !== 0 ? (
              <Table striped>
                <thead>
                <tr>
                  <th></th>
                  <th>Nazwa gry</th>
                  <th>Liczba graczy</th>
                </tr>
                </thead>
                <tbody>
                {searchResults}
                </tbody>
              </Table>
            ) :
              (
                <Alert bsStyle="warning">
                  Nie znaleziono gier spełniających kryteria wyszukiwania. Spróbuj wyszukać inny tytuł...
                </Alert>
              )
          }
        </Grid>
      )
    }
  }
)
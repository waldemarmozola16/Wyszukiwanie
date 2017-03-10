import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Grid, Row, Col, Panel, PageHeader } from 'react-bootstrap'
import {Tabs, Tab} from 'react-bootstrap-tabs';

import {fetchUsers} from '../../state/users'


export default connect(
  state => ({
    users: state.users
  }),
  dispatch => ({
    fetchUsersHelper: () => dispatch(fetchUsers())
  })
)(
  class UserProfileView extends React.Component {
    render() {
      const {
        params,
        users
      } = this.props

      const currentUser =
        users.data ?
          users.data.find(
            user => user.id === parseInt(params.userId, 10)
          ) : null

      if (currentUser === null) {
        return <p>Waiting for users data...</p>
      }


      return (
        <Grid>
          <PageHeader>Profil Użytkownika<br/>
          </PageHeader>
          <Row>
            <Col xs={12} sm={3} md={3}>
              <div key={currentUser.id}>
                <img
                  src={process.env.PUBLIC_URL + currentUser.picture}
                  alt={"Awatar użytkownika " + currentUser.name}
                />
              </div>
            </Col>

            <Col xs={12} sm={8} md={8}>
              <div key={currentUser.id}>
                <h3>{currentUser.name}</h3>
                <p>{currentUser.about}</p>
              </div>
            </Col>
          </Row>
          <Col xs={12} md={12}>
          </Col>
          <Row>
            <Col xs={12} md={12}>
              <Panel>
                <Tabs id="noanim-tab-example">
                  <Tab label="Posiadam">
                    <h3>Posiadam</h3>
                    <ul>
                      {
                        currentUser.id ?
                          currentUser.gameList.map(
                            game => (
                              <li>
                                <Link to={'/game-profile/' + game.id}>
                                  {game.name}
                                </Link>
                              </li>
                            )
                          )
                          : <p>Waiting for users data..</p>
                      }
                    </ul>
                  </Tab>
                  <Tab label="Szukam">
                    <h3>Szukam</h3>
                    <ul>
                      {
                        currentUser.id ?
                          currentUser.wishList.map(
                            game => (
                              <li>
                                <Link to={'/game-profile/' + game.name}>
                                  {game.name}
                                </Link>
                              </li>
                            )
                          )
                          : <p>Waiting for users data..</p>
                      }

                    </ul>
                  </Tab>
                </Tabs>
              </Panel>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
)


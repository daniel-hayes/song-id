import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  WebView
} from 'react-native';
import { connect } from 'react-redux';
import qs from 'qs';
import { REDDIT_CONFIG } from './config';

const { clientId, uri, redirectUri, protocol, responseType, state, scope } = REDDIT_CONFIG;
const LOGIN_URI = `${uri}?client_id=${clientId}&response_type=${responseType}&state=${state}&redirect_uri=${protocol}://${redirectUri}&scope=${scope.join('%20')}`

class RedditLogin extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      login: false
    };

    this.handlePress = this.handlePress.bind(this);
    this.navigationStateChange = this.navigationStateChange.bind(this);
  }

  handlePress() {
    this.setState({ login: true });
  }

  navigationStateChange(navState) {
    const { state, url = '' } = navState;
    const redirect = `${protocol}://${redirectUri}`;

    // @TODO use this for state and change each request (`${Math.random()}IdThisSong`)
    if (url.startsWith(redirect)) {
      const params = qs.parse(url);

      if (params.error) {
        return this.setState({ login: false });
      }

      const token = params[`${redirect}#access_token`];

      if (params.state === REDDIT_CONFIG.state && token) {
        const data = {
          api_type: 'json',
          kind: 'link',
          sr: 'test',
          title: 'test',
          text: 'hello world',
          url: 'http://www.google.com/123'
        };

        fetch(
          `${REDDIT_CONFIG.oAuthApi}/api/submit?${qs.stringify(data)}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'User-Agent': `${Platform.OS}:${protocol}:v0.1 (by USERNAME)`
            }
          }
        )
          .then(response => response.json())
          .then(json => {
            console.log(json);
          })
          .catch(error => {
            console.log(error);
          });

        // @TODO put this in an actions file
        this.props.dispatch({
          type: 'LOGIN_SUCCESS'
        });
      }
    }
  }

  render() {
    const { login } = this.state;
    const { authenticated } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.loginText}>
          Log in to Reddit or create an account.
        </Text>
        <Text style={styles.signupText}>
          Signing up only takes a minute.
        </Text>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={this.handlePress}>
          <Text style={styles.loginButtonText}>
            Log in or sign up
          </Text>
        </TouchableHighlight>
        {!authenticated && login &&
          <View style={styles.webView}>
            <WebView
              source={{ uri: LOGIN_URI }}
              scalesPageToFit={false}
              onNavigationStateChange={this.navigationStateChange} />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: '#f0f0f0',
    marginBottom: 10,
    fontSize: 18
  },
  signupText: {
    color: '#f0f0f0',
    fontSize: 12
  },
  loginButton: {
    backgroundColor: '#da3c30',
    borderRadius: 3,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    width: '75%',
    marginTop: 80
  },
  loginButtonText: {
    color: '#f0f0f0',
    textAlign: 'center',
    fontSize: 16
  },
  webView: {
    ...StyleSheet.absoluteFillObject
  }
});

export default connect(state => state)(RedditLogin);

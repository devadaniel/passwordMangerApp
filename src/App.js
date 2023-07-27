import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const starImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
const starImageAltText = 'stars'

class App extends Component {
  state = {
    webSiteUrl: '',
    username: '',
    inputPassword: '',
    searchInput: '',
    passwordList: [],
    showPassword: false,
  }

  addNewPassword = event => {
    event.preventDefault()
    const {webSiteUrl, username, inputPassword} = this.state
    const newPasswordList = {
      id: uuidv4(),
      url: webSiteUrl,
      name: username,
      password: inputPassword,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordList],
      webSiteUrl: '',
      username: '',
      inputPassword: '',
      showPassword: false,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEnterPassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  OnChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEnterWebsite = event => {
    this.setState({webSiteUrl: event.target.value})
  }

  renderAddNewPassword = () => {
    const {webSiteUrl, username, inputPassword} = this.state
    return (
      <div className="add-new-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          alt=" password manager"
          className="password-manager-image"
        />
        <div className="password-card-container">
          <h1 className="add-password-heading">Add New Password</h1>
          <div className="add-password-form-container">
            <form onSubmit={this.addNewPassword}>
              <div className="website-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-image"
                />
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Website"
                  onChange={this.onChangeEnterWebsite}
                  value={webSiteUrl}
                />
              </div>
              <div className="website-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website-image"
                />
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Username"
                  onChange={this.OnChangeUsername}
                  value={username}
                />
              </div>
              <div className="website-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="website-image"
                />
                <input
                  type="password"
                  className="input-box"
                  placeholder="Enter Password"
                  onChange={this.onChangeEnterPassword}
                  value={inputPassword}
                />
              </div>
              <div className="button-container">
                <button className="add-button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  OnClickDelete = id => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: filteredPasswordList, showPassword: true})
  }

  onClickCheckBox = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  render() {
    const {passwordList, searchInput, showPassword} = this.state
    const searchResult = passwordList.filter(eachItem =>
      eachItem.url.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        {this.renderAddNewPassword()}
        <div className="your-password-container">
          <div className="your-password-header-container">
            <h1 className="your-password-heading">Your Passwords</h1>
            <p className="password-count">{passwordList.length}</p>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-image"
              />
              <input
                type="search"
                className="search-box"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>

          <hr className="separator" />
          <div className="show-password-input-box-container">
            <input
              type="checkbox"
              id="checkBox"
              className="check-box"
              onClick={this.onClickCheckBox}
            />
            <label htmlFor="checkBox" className="show-password-text">
              Show passwords
            </label>
          </div>
          {searchResult.length !== 0 ? (
            <ul className="password-list-items">
              {searchResult.map(eachPasswordItem => (
                <li className="each-password-item" key={eachPasswordItem.id}>
                  <div className="each-password-card-container">
                    <div className="each-password-card-item">
                      <h1 className="first-letter-url">
                        {eachPasswordItem.url[0]}
                      </h1>
                      <div className="name-password-url-container">
                        <p className="url-name">{eachPasswordItem.url}</p>
                        <p className="user-name">{eachPasswordItem.name}</p>
                        {showPassword ? (
                          <p className="password-text">
                            {eachPasswordItem.password}
                          </p>
                        ) : (
                          <img
                            src={starImage}
                            alt={starImageAltText}
                            className="start-image"
                          />
                        )}
                      </div>
                    </div>
                    <button
                      data-testid="delete"
                      className="delete-button"
                      type="button"
                      onClick={() => this.OnClickDelete(eachPasswordItem.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete-button-image"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-password-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App

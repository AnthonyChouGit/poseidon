const is_valid_username = (username) => {
  return username.match(/^[a-zA-Z0-9]{5,20}$/);
}

const is_valid_password = (password) => {
  return password.match(/^[a-zA-Z0-9]{8,24}$/);
}

const is_valid_email = (email) => {
  return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
}

module.exports = {
  is_valid_username,
  is_valid_password,
  is_valid_email
}
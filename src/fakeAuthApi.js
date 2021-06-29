// DATABASE
const Users = [
  {
    username: "shivaansh",
    password: "agarwal"
  }
];

const findUserByUserName = (username) => {
  return Users.find((user) => user.username === username);
};

const fakeAuthApi = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByUserName(username);
      if (user.password === password) {
        resolve({
          success: true,
          status: 200,
          token: "abcdefghi"
        });
      }
      reject({
        success: false,
        status: 401
      });
    }, 500);
  });
};

export { fakeAuthApi };

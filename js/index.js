document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('github-form');
  const userList = document.getElementById('user-list');
  const reposList = document.getElementById('repos-list');

  form.addEventListener('submit', handleSearch);

  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search').value;
    searchUsers(query);
  }

  function searchUsers(query) {
    const userUrl = `https://api.github.com/search/users?q=${query}`;
    fetch(userUrl)
      .then(response => response.json())
      .then(data => renderUserList(data.items))
      .catch(error => console.error('Error fetching users:', error));
  }

  function renderUserList(users) {
    userList.innerHTML = '';
    reposList.innerHTML = '';
    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.className = 'user';
      userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
        <div>
          <p><strong>${user.login}</strong></p>
          <a href="${user.html_url}" target="_blank">View Profile</a>
        </div>
      `;
      userItem.addEventListener('click', () => fetchUserRepos(user.login));
      userList.appendChild(userItem);
    });
  }

  function fetchUserRepos(username) {
    const repoUrl = `https://api.github.com/users/${username}/repos`;
    fetch(repoUrl)
      .then(response => response.json())
      .then(data => renderRepoList(data))
      .catch(error => console.error('Error fetching repositories:', error));
  }

  function renderRepoList(repos) {
    reposList.innerHTML = '';
    repos.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.className = 'repo';
      repoItem.innerHTML = `
        <div>
          <p><strong>${repo.name}</strong></p>
          <a href="${repo.html_url}" target="_blank">View Repository</a>
        </div>
      `;
      reposList.appendChild(repoItem);
    });
  }
});

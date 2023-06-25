'use client';

import GitHubButton from 'react-github-btn';

export function GithubButton() {
  return (
    <GitHubButton
      href="https://github.com/zdenham/ethscriber"
      data-size="large"
      data-show-count="true"
      aria-label="Star zdenham/ethscriber on GitHub"
    >
      Github
    </GitHubButton>
  );
}

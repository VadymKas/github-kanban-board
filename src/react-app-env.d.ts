/// <reference types="react-scripts" />

type IssuesSliceState = {
  input: string;
  url: string;
  issues: [];
  status: 'loading' | 'success' | 'error';
};

type CardProps = {
  index: number;
  title: string;
  number: number;
  user: {
    type: string;
  };
  updated_at: string;
  comments: number;
};

type FetchProps = {
  title: string;
  number: number;
  state: 'open' | 'closed';
  assignees: [];
  user: {
    type: string;
  };
  updated_at: string;
  comments: number;
};

type CardCol = {
  name: string;
  id: string;
  issues: CardProps[];
};

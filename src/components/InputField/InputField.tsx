import React from 'react';
import { Input, Space, Button, Flex } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useSelector } from 'react-redux';

import {
  fetchIssues,
  setUrl,
  url,
  status,
} from '../../redux/slices/issueSlice';
import { useAppDispatch } from '../../redux/store';

const { Search } = Input;

const InputField: React.FC = () => {
  const dispatch = useAppDispatch();
  const repoURL = useSelector(url);
  const statusValue = useSelector(status);

  const profileURL: string = repoURL.split('/').slice(0, -1).join('/');

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(e.target.value));
  };

  const getIssues: SearchProps['onSearch'] = (value, _e) => {
    dispatch(fetchIssues(value));
  };

  return (
    <Flex vertical>
      <Space>
        <Search
          placeholder='Enter repo URL'
          allowClear
          enterButton='Load'
          onSearch={getIssues}
          onChange={inputValueHandler}
          value={repoURL}
          style={{ minWidth: '400px' }}
        />
      </Space>
      <Flex
        justify='center'
        align='center'
        style={{ margin: '15px 0 0' }}>
        <Button
          type='link'
          href={profileURL}
          target='_blank'
          disabled={statusValue === 'success' ? false : true}>
          {statusValue === 'success'
            ? profileURL.split('/').slice(-1)
            : 'Profile link'}
        </Button>
        <span>&#62;</span>
        <Button
          type='link'
          href={repoURL}
          target='_blank'
          disabled={statusValue === 'success' ? false : true}>
          {statusValue === 'success'
            ? repoURL.split('/').slice(-1)
            : 'Repo link'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default InputField;

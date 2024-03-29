import React from 'react';
import { Input, Space, Button, Flex } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useSelector } from 'react-redux';

import {
  fetchIssues,
  setInputValue,
  clearState,
  state,
} from '../../redux/slices/issueSlice';
import { useAppDispatch } from '../../redux/store';

const { Search } = Input;

const InputField: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    input: inputValue,
    url: repoURL,
    status: statusValue,
  } = useSelector(state);

  const profileURL: string = repoURL.split('/').slice(0, -1).join('/');

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
    if (repoURL) {
      dispatch(clearState());
    }
  };

  const getIssues: SearchProps['onSearch'] = (value, _e) => {
    dispatch(fetchIssues(value));
    dispatch(setInputValue(''));
  };

  return (
    <Flex
      className='inputFiled'
      vertical>
      <Space>
        <Search
          placeholder='Enter repo URL'
          allowClear
          enterButton='Load'
          onSearch={getIssues}
          onChange={inputValueHandler}
          value={inputValue}
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

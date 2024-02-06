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
  const urlValue = useSelector(url);
  const statusValue = useSelector(status);

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
          value={urlValue}
          style={{ minWidth: '400px' }}
        />
      </Space>
      <Button
        type='link'
        href={urlValue}
        target='_blank'
        style={{ padding: '20px 0 10px' }}
        disabled={statusValue === 'success' ? false : true}>
        Repo link
      </Button>
    </Flex>
  );
};

export default InputField;

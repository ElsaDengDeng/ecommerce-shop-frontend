import React, { FC } from 'react';
import { List, Radio, RadioChangeEvent, Typography } from 'antd';
import prices from '../../helpers/price';
import { FormattedMessage } from 'react-intl';

const { Title } = Typography;
interface Props {
  handleFilter: (arg: number[]) => void;
}
const RadioBox: FC<Props> = ({ handleFilter }) => {
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    handleFilter(e.target.value);
  };
  return (
    <>
      <Title level={4}>
        <FormattedMessage id="FilterByPrice" />
      </Title>
      <Radio.Group>
        <List
          dataSource={prices}
          renderItem={(item) => (
            <List.Item>
              <Radio onChange={onChange} value={item.array}>
                {item.name}
              </Radio>
            </List.Item>
          )}
        ></List>
      </Radio.Group>
    </>
  );
};

export default RadioBox;

import React, { FC, useEffect } from 'react';
import { Checkbox, GetProp, List, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchGetCategory } from '../../features/category/categoryAPI';
import { selectCategory } from '../../features/category/categorySlice';
import { FormattedMessage, useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  handleFilter: (arg: string[]) => void;
}
const CheckBox: FC<Props> = ({ handleFilter }) => {
  const intl = useIntl(); // 获取翻译钩子
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);

  // 在页面初始化时 或者页面挂载完成之后 获取数据
  // 第二个参数为[] 只让组件在挂载完成时执行一次
  useEffect(() => {
    dispatch(fetchGetCategory());
  }, []);

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    console.log('checked = ', checkedValues);
    handleFilter(checkedValues as string[]);
  };
  return (
    <>
      <Title level={4}>
        <FormattedMessage id="FilterByCategory" />
      </Title>
      <Checkbox.Group
        className="checkBoxFilter"
        options={category.result.map((item) => ({
          label: item.name,
          value: item._id,
        }))}
        onChange={onChange}
      ></Checkbox.Group>
    </>
  );
};

export default CheckBox;

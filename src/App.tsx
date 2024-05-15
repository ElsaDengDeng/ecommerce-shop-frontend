import React, { createContext, useState } from 'react';
import AppRoutes from './AppRoutes';
import zhCN from 'antd/es/locale/zh_CN';
import jaJP from 'antd/locale/ja_JP';
import { messages } from './helpers/i18n';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import '@formatjs/intl-numberformat/locale-data/ja';

export interface LocaleContextType {
  locale: 'zh' | 'jp';
  toggleLocale: () => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined
); // 创建上下文
const App: React.FC = () => {
  const [locale, setLocale] = useState<'jp' | 'zh'>('jp'); // 默认语言
  const antdLocale = locale === 'zh' ? zhCN : jaJP; // Ant Design 语言包
  const toggleLocale = () => {
    setLocale(locale === 'zh' ? 'jp' : 'zh'); // 切换语言
  };
  const contextValue: LocaleContextType = { locale, toggleLocale }; // 定义上下文值
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ConfigProvider locale={antdLocale}>
        <LocaleContext.Provider value={contextValue}>
          <AppRoutes />
        </LocaleContext.Provider>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default App;

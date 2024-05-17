import React, {
  useState,
  useContext,
  FC,
} from "react";

type LocaleType = "zh" | "jp";
type UpdateLocale = () => void; 

const defaultLocale:LocaleType = "jp"
const defaultUpdateFunction: UpdateLocale = () => {}; // 默认的更新函数，可以定义具体的逻辑

export const LocaleContext = React.createContext<[LocaleType, () => void]>([
  defaultLocale, 
  defaultUpdateFunction
]);

interface Props {
  children: React.ReactNode;
}
const LocaleStore: FC<Props> = ({ children }) => {
  const [locale, setLocale] = useState<"jp" | "zh">("jp");
  const toggleLocale = () => {
    
    console.log('改变之前语言', locale)
    setLocale(locale === "jp" ? "zh" : "zh"); // 切换语言
    console.log('当前语言', locale)
    debugger
  };
  return (
    <LocaleContext.Provider value={[locale, toggleLocale]}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleStore;

export const useLocale = () => useContext(LocaleContext);

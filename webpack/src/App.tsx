import React, { useState } from "react";

import { ThemeContext } from "@skbkontur/react-ui/lib/theming/ThemeContext";
import { ThemeFactory } from "@skbkontur/react-ui/lib/theming/ThemeFactory";
import { SizeControlContext } from "@skbkontur/react-ui/lib/size/SizeControlContext";
import { Button } from "@skbkontur/react-ui/components/Button";
import { Checkbox } from "@skbkontur/react-ui/components/Checkbox";
import { Gapped } from "@skbkontur/react-ui/components/Gapped";
import { Input } from "@skbkontur/react-ui/components/Input";
import { Link } from "@skbkontur/react-ui/components/Link";
import { Radio } from "@skbkontur/react-ui/components/Radio";
import { RadioGroup } from "@skbkontur/react-ui/components/RadioGroup";
import { Tabs } from "@skbkontur/react-ui/components/Tabs";
import { Toggle } from "@skbkontur/react-ui/components/Toggle";
import { Tooltip } from "@skbkontur/react-ui/components/Tooltip";
import { SideMenu, type SideMenuThemeIn } from "@skbkontur/side-menu";

import { IconArrowALeftRegular24 } from "@skbkontur/icons/IconArrowALeftRegular24";
import { IconCommentRectTextRegular24 } from "@skbkontur/icons/IconCommentRectTextRegular24";
import { IconDocTextRegular24 } from "@skbkontur/icons/IconDocTextRegular24";
import { IconMarketShoppingBasketRegular24 } from "@skbkontur/icons/IconMarketShoppingBasketRegular24";
import { IconNaturePlantFlowerSolid20 } from "@skbkontur/icons/IconNaturePlantFlowerSolid20";
import { IconPeople2Regular24 } from "@skbkontur/icons/IconPeople2Regular24";
import { IconQuestionCircleLight20 } from "@skbkontur/icons/IconQuestionCircleLight20";
import { IconSettingsGearRegular24 } from "@skbkontur/icons/IconSettingsGearRegular24";
import { IconStackHDownRegular24 } from "@skbkontur/icons/IconStackHDownRegular24";
import { IconWarningTriangleSolid20 } from "@skbkontur/icons/IconWarningTriangleSolid20";

import { Kontur } from "@skbkontur/logos/src/Kontur";
import { Product } from "@skbkontur/logos/src/Product";

import styles from "./App.module.css";

function App() {
  const [activeTab, setActiveTab] = useState<string>("tab-0");
  const [activeRadio, setActiveRadio] = useState<number>(1);
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <div className={styles.wrapper}>
      <ThemeContext.Provider
        value={ThemeFactory.create<SideMenuThemeIn>({
          sideMenuMarkerBg: "#366AF3",
        })}
      >
        <SideMenu className={styles.sideMenu}>
          <SideMenu.Header
            konturLogo={<Kontur />}
            productLogo={<Product color="#366AF3" />}
          />
          <SideMenu.Body>
            <SideMenu.Item
              icon={<IconDocTextRegular24 />}
              caption="Документы"
            />
            <SideMenu.Item icon={<IconPeople2Regular24 />} caption="Команда" />
            <SideMenu.Item
              icon={<IconCommentRectTextRegular24 />}
              caption="Сообщения"
              marker={1}
            />
            <SideMenu.Item
              icon={<IconMarketShoppingBasketRegular24 />}
              caption="Товары"
            />
          </SideMenu.Body>
          <SideMenu.Footer>
            <SideMenu.Organisations icon={<IconStackHDownRegular24 />} />
            <SideMenu.Item
              icon={<IconSettingsGearRegular24 />}
              caption="Настройки"
            />
            <SideMenu.Avatar userName="Кирилл Лаптев" />
          </SideMenu.Footer>
        </SideMenu>
      </ThemeContext.Provider>
      <SizeControlContext.Provider value={{ size: "medium" }}>
        <div className={styles.container}>
          <header className={styles.header}>
            <Button
              use="text"
              size="large"
              icon={<IconArrowALeftRegular24 color="rgba(0, 0, 0, 0.32)" />}
            />
            <span className={styles.headerTitle}>Иванов Иван Иванович</span>
          </header>
          <div className={styles.panel}>
            <IconNaturePlantFlowerSolid20 />
            Теперь появилась возможность разукрасить интерфейс!
          </div>
          <main className={styles.content}>
            <Tabs value={activeTab} onValueChange={setActiveTab} size="small">
              <Tabs.Tab id="tab-0">Настройки доступа</Tabs.Tab>
              <Tabs.Tab id="tab-1">Безопасность</Tabs.Tab>
              <Tabs.Tab id="tab-2">Подписки</Tabs.Tab>
              <Tabs.Tab id="tab-3">Документы</Tabs.Tab>
            </Tabs>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Почта</span>
              <Input width={288} />
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Доступ</span>
              <div className={styles.itemBody}>
                <div className={styles.itemToggle}>
                  <Toggle>Разрешить</Toggle>
                </div>
                <p className={styles.itemText}>
                  Мы обновили анкету участника, чтобы встречи становились ещё
                  комфортнее.{" "}
                  <Link href="https://kontur.ru">Подробнее в статье</Link>
                </p>
              </div>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Уровень</span>
              <RadioGroup value={activeRadio} onValueChange={setActiveRadio}>
                <Gapped vertical gap={0}>
                  <Radio value={1}>Администратор</Radio>
                  <Radio value={2}>Пользователь</Radio>
                  <Radio value={3}>Только чтение</Radio>
                </Gapped>
              </RadioGroup>
            </div>
            <div className={styles.item}>
              <span className={styles.itemTitle}>Другое</span>
              <Checkbox checked={checked} onValueChange={setChecked}>
                Входить по умолчанию
              </Checkbox>
              <Tooltip
                render={() => (
                  <div style={{ width: 200 }}>
                    При входе в сервис сотруднику не придётся проходить
                    авторизацию.
                  </div>
                )}
              >
                <IconQuestionCircleLight20 color="rgba(0, 0, 0, 0.56)" />
              </Tooltip>
            </div>
          </main>
          <footer className={styles.footer}>
            <div className={styles.footerDivider} />
            <div className={styles.footerContent}>
              <div className={styles.footerControls}>
                <Button use="primary" size="large">
                  Сохранить
                </Button>
                <Button use="backless" size="large">
                  Отменить
                </Button>
              </div>
              <div className={styles.footerWarningPanel}>
                <IconWarningTriangleSolid20 color="#FFBE3D" />
                Укажите все данные для сохранения
              </div>
            </div>
          </footer>
        </div>
      </SizeControlContext.Provider>
    </div>
  );
}

export default App;

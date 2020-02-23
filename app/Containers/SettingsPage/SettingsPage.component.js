import React, { useState, Fragment } from 'react';
import { View, Linking } from 'react-native';
import I18n from 'i18next';

import { Styles } from './SettingsPage.style';
import { Routes } from '../../Navigation/Routes';
import { Row } from '../../Components/Row/RowComponent';
import { Lists } from '../../Components/Lists/ListsComponent';
import { RadioComponent } from '../../Components/Radio/RadioComponent';
import { SwitchComponent } from '../../Components/Switch/SwitchComponent';
import { ModalOptions } from '../../Components/ModalOptions/ModalOptionsComponent';

const SettingsPage = ({ navigation }) => {
  const [switchBtn, setSwitchBtn] = useState(false);
  const [modalFontVisible, setModalFontVisible] = useState(false);
  const [modalLangVisible, setModalLangVisible] = useState(false);
  const [lang, setLang] = useState({
    id: {
      language: 'Bahasa Indonesia',
      checked: true,
      code: 'id',
    },
    en: {
      language: 'Bahasa Inggris',
      checked: false,
      code: 'en',
    },
  });
  const [font, setFont] = useState({
    lpmq: {
      name: 'LPMQ Standar KEMENAG',
      checked: true,
      code: 'lpmq',
    },
    ar: {
      name: 'Arabic Font Standar Utsmani',
      checked: false,
      code: 'ar',
    },
  });

  const toggleSwitch = val => {
    setSwitchBtn(val);
  };

  const toggleModalFont = () => {
    setModalFontVisible(!modalFontVisible);
  };

  const toggleModalLang = () => {
    setModalLangVisible(!modalLangVisible);
  };

  const onPressHelp = () => {
    Linking.openURL('https://apple.com');
  };

  const radioOnPressLang = item => () => {
    setLang({
      id: {
        language: 'Bahasa Indonesia',
        checked: item.code === 'id' ? true : false,
        code: 'id',
      },
      en: {
        language: 'Bahasa Inggris',
        checked: item.code === 'en' ? true : false,
        code: 'en',
      },
    });
    setModalLangVisible(!modalLangVisible);
  };

  const radioOnPressFont = item => () => {
    setFont({
      lpmq: {
        name: 'LPMQ Standar KEMENAG',
        checked: item.code === 'lpmq' ? true : false,
        code: 'lpmq',
      },
      ar: {
        name: 'Arabic Font Standar Utsmani',
        checked: item.code === 'ar' ? true : false,
        code: 'ar',
      },
    });
    setModalFontVisible(!modalFontVisible);
  };

  const GeneralSettings = [
    {
      title: I18n.t('FontType'),
      description: 'LPMQ standar KEMENAG',
      onPress: () => toggleModalFont(),
    },
    {
      title: I18n.t('AppLanguage'),
      description: I18n.t('Indonesian'),
      onPress: () => toggleModalLang(),
    },
  ];

  const OtherSettings = [
    {
      title: I18n.t('Help'),
      description: I18n.t('HelpDesc'),
      onPress: onPressHelp,
    },
    {
      title: I18n.t('AppVersion'),
      description: '1.0',
      onPress: () => navigation.navigate(Routes.AboutPage),
    },
  ];

  const renderModalOptionsLang = () => {
    const langs = Object.keys(lang);
    return (
      <ModalOptions
        type={I18n.t('ChooseLanguage')}
        onBackdropPress={toggleModalLang}
        isVisible={modalLangVisible}
        onPressCancel={toggleModalLang}>
        {langs.map((item, i) => (
          <RadioComponent
            key={i}
            text={lang[item].language}
            value={lang[item]}
            status={lang[item].checked ? 'checked' : 'unchecked'}
            onPress={radioOnPressLang(lang[item])}
            radioOnpress={radioOnPressLang(lang[item])}
          />
        ))}
      </ModalOptions>
    );
  };

  const renderModalOptionsHuruf = () => {
    const fonts = Object.keys(font);
    return (
      <ModalOptions
        type={I18n.t('SelectArabicFont')}
        onBackdropPress={toggleModalFont}
        isVisible={modalFontVisible}
        onPressCancel={toggleModalFont}>
        {fonts.map((item, i) => (
          <RadioComponent
            key={i}
            text={font[item].name}
            value={font[item]}
            status={font[item].checked ? 'checked' : 'unchecked'}
            onPress={radioOnPressFont(font[item])}
            radioOnpress={radioOnPressFont(font[item])}
          />
        ))}
      </ModalOptions>
    );
  };

  const renderSettingLists = () => {
    return (
      <Fragment>
        <Row title={I18n.t('GeneralSettings')}>
          {GeneralSettings.map((item, i) => (
            <Lists
              key={i}
              title={item.title}
              description={item.description}
              onPress={item.onPress}
            />
          ))}
          <SwitchComponent
            title={I18n.t('DarkMode')}
            description={
              switchBtn ? I18n.t('DarkModeOn') : I18n.t('DarkModeOff')
            }
            value={switchBtn}
            onValueChange={toggleSwitch}
          />
        </Row>
        <Row title={I18n.t('OtherSetting')}>
          {OtherSettings.map((item, i) => (
            <Lists
              key={i}
              title={item.title}
              description={item.description}
              onPress={item.onPress}
            />
          ))}
        </Row>
      </Fragment>
    );
  };

  return (
    <View style={Styles.container}>
      {renderSettingLists()}
      {renderModalOptionsLang()}
      {renderModalOptionsHuruf()}
    </View>
  );
};

export default SettingsPage;

SettingsPage.navigationOptions = () => ({
  title: I18n.t('SettingsTitle'),
});

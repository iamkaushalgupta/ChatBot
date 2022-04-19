import React, {useState, useEffect,} from 'react';
import { Image, SafeAreaView, StatusBar,} from 'react-native';
import {
  GiftedChat,
  Bubble,
  BubbleProps,
  Reply,
} from 'react-native-gifted-chat';

import {Dialogflow_V2} from 'react-native-dialogflow';
import dialogflowconfig from '../../../env';
import styles from './style';
import {colors, icons} from '../../constants';

const HomeScreen = () => {
  const Bot = {
    _id: 4,
    name: 'Mr. Bot',
    avatar: icons.avtar,
  };

  const [messages, setMessages] = useState([
    {
      _id: 3,
      text: `How can I help You ?`,
      createdAt: new Date(),
      user: Bot,
    },
    {
      _id: 2,
      text: `I am Succesivian Bot`,
      createdAt: new Date(),
      user: Bot,
    },
    {
      _id: 1,
      text: `Hi!`,
      createdAt: new Date(),
      user: Bot,
    },
  ]);


  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowconfig.client_email,
      dialogflowconfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowconfig.project_id,
    );

  }, []);

  const onSend = (message: any) => {
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, message);
    });
    let msg = message[0].text;
    console.log(message);
    Dialogflow_V2.requestQuery(
      msg,
      result => {
        console.log('result', result);
        handleGoogleResponse(result);
      },
      error => {
        console.log(error);
      },
    );
  };

  const handleGoogleResponse = (result: any) => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text);
  };

  const sendBotResponse = (text: any) => {
    if (text == 'Technologies') {
      let msg = {
        _id: messages.length + 1,
        text: 'Please choose the technology',
        createdAt: new Date(),
        user: Bot,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {title: 'React-Native', value: 'React-Native'},
            {title: 'Flutter', value: 'Flutter'},
            {title: 'Others', value: 'Others'},
          ],
        },
      };
      setMessages(previousMessages => {
        return GiftedChat.append(previousMessages, [msg]);
      });
    } else {
      let msg = {
        _id: messages.length + 1,
        text,
        createdAt: new Date(),
        user: Bot,
      };
      setMessages(previousMessages => {
        return GiftedChat.append(previousMessages, [msg]);
      });
    }
  };
  const renderBubble = (
    props: Readonly<
      BubbleProps<{
        _id: number;
        text: string;
        createdAt: Date;
        user: {_id: number; name: string; avatar: any};
      }>
    > &
      Readonly<{children?: React.ReactNode}>,
  ) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {color: colors.sendTextColor},
          left: {color: colors.recieveTextColor},
        }}
        wrapperStyle={{
          left: {backgroundColor: colors.recieveContainerColor},
          right: {backgroundColor: colors.sendContainerColor},
        }}></Bubble>
    );
  };

  const onQuickReply = (props: Reply[]) => {
    let msg = {
      _id: messages.length+1000000,
      text: props[0].value,
      createdAt: new Date(),
      user: Bot,
    };
    onSend([msg]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.statusBarColor} />
      <Image source={icons.main_logo} style={styles.headingLogo} />
      <GiftedChat
        renderBubble={(props: any) => renderBubble(props)}
        messages={messages}
        onQuickReply={(props: Reply[]) => onQuickReply(props)}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
          avatar: icons.avtar,
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

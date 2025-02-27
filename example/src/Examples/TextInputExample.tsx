import * as React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { inputReducer, State } from '../../utils';
import ScreenWrapper from '../ScreenWrapper';
import {
  amber900,
  pink400,
  red500,
  transparent,
} from '../../../src/styles/colors';

const MAX_LENGTH = 20;

const initialState: State = {
  text: '',
  customIconText: '',
  name: '',
  outlinedText: '',
  largeText: '',
  flatTextPassword: 'Password',
  outlinedLargeText: '',
  outlinedTextPassword: '',
  nameNoPadding: '',
  nameRequired: '',
  flatDenseText: '',
  flatDense: '',
  outlinedDenseText: '',
  outlinedDense: '',
  flatMultiline: '',
  flatTextArea: '',
  flatUnderlineColors: '',
  outlinedMultiline: '',
  outlinedTextArea: '',
  outlinedColors: '',
  outlinedLongLabel: '',
  maxLengthName: '',
  flatTextSecureEntry: true,
  outlineTextSecureEntry: true,
  flatMultilineCustomHeightNoLabel: '',
  flatMultilineCustomHeightNoLabelTop: '',
  outlinedMultilineCustomHeightNoLabel: '',
  iconsColor: {
    flatLeftIcon: undefined,
    flatRightIcon: undefined,
    outlineLeftIcon: undefined,
    outlineRightIcon: undefined,
    customIcon: undefined,
  },
};

type AvoidingViewProps = {
  children: React.ReactNode;
};

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};

const TextInputExample = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    text,
    customIconText,
    name,
    outlinedText,
    largeText,
    flatTextPassword,
    outlinedLargeText,
    outlinedTextPassword,
    nameNoPadding,
    nameRequired,
    flatDenseText,
    flatDense,
    outlinedDenseText,
    outlinedDense,
    flatMultiline,
    flatTextArea,
    flatUnderlineColors,
    outlinedMultiline,
    outlinedTextArea,
    outlinedColors,
    maxLengthName,
    flatTextSecureEntry,
    outlineTextSecureEntry,
    flatMultilineCustomHeightNoLabel,
    flatMultilineCustomHeightNoLabelTop,
    outlinedMultilineCustomHeightNoLabel,
    iconsColor: {
      flatLeftIcon,
      flatRightIcon,
      outlineLeftIcon,
      outlineRightIcon,
      customIcon,
    },
  } = state;

  const _isUsernameValid = (name: string) => /^[a-zA-Z]*$/.test(name);

  const {
    colors: { accent, primary },
  } = useTheme();

  const inputActionHandler = (type: keyof State, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });

  const changeIconColor = (name: keyof State['iconsColor']) => {
    const color = state.iconsColor[name];

    const colors = {
      ...state.iconsColor,
      [name]: !color ? accent : undefined,
    };

    dispatch({
      type: 'iconsColor',
      payload: colors,
    });
  };

  return (
    <TextInputAvoidingView>
      <ScreenWrapper
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
      >
        <TextInput
          style={styles.inputContainerStyle}
          label="Flat input"
          placeholder="Type something"
          value={text}
          onChangeText={(text) => inputActionHandler('text', text)}
          left={
            <TextInput.Icon
              name="heart"
              color={flatLeftIcon}
              onPress={() => {
                changeIconColor('flatLeftIcon');
              }}
            />
          }
          right={<TextInput.Affix text="/100" />}
        />
        <TextInput
          style={[styles.inputContainerStyle, styles.fontSize]}
          label="Flat input large font"
          placeholder="Type something"
          value={largeText}
          onChangeText={(largeText) =>
            inputActionHandler('largeText', largeText)
          }
          left={<TextInput.Affix text="#" />}
          right={
            <TextInput.Icon
              name="heart"
              color={flatRightIcon}
              onPress={() => {
                changeIconColor('flatRightIcon');
              }}
            />
          }
        />
        <TextInput
          style={[styles.inputContainerStyle, styles.fontSize]}
          label="Flat input large font"
          placeholder="Type something"
          value={flatTextPassword}
          onChangeText={(flatTextPassword) =>
            inputActionHandler('flatTextPassword', flatTextPassword)
          }
          secureTextEntry={flatTextSecureEntry}
          right={
            <TextInput.Icon
              name={flatTextSecureEntry ? 'eye' : 'eye-off'}
              onPress={() =>
                dispatch({
                  type: 'flatTextSecureEntry',
                  payload: !flatTextSecureEntry,
                })
              }
              forceTextInputFocus={false}
            />
          }
        />
        <TextInput
          style={styles.inputContainerStyle}
          label="Flat input with custom icon"
          placeholder="Type something"
          value={customIconText}
          onChangeText={(text) => inputActionHandler('customIconText', text)}
          right={<TextInput.Affix text="/100" />}
          left={
            <TextInput.Icon
              name={() => (
                <Icon
                  name="heart"
                  size={24}
                  color={customIcon}
                  onPress={() => {
                    changeIconColor('customIcon');
                  }}
                />
              )}
            />
          }
        />
        <TextInput
          style={styles.inputContainerStyle}
          dense
          label="Dense flat input"
          placeholder="Type something"
          value={flatDenseText}
          onChangeText={(flatDenseText) =>
            inputActionHandler('flatDenseText', flatDenseText)
          }
          left={<TextInput.Affix text="#" />}
          right={
            <TextInput.Icon
              name="chevron-up"
              color={(focused) => (focused ? primary : undefined)}
            />
          }
        />
        <TextInput
          style={styles.inputContainerStyle}
          dense
          placeholder="Dense flat input without label"
          value={flatDense}
          onChangeText={(flatDense) =>
            inputActionHandler('flatDense', flatDense)
          }
        />
        <TextInput
          style={styles.inputContainerStyle}
          label="Flat input multiline"
          multiline
          placeholder="Type something"
          value={flatMultiline}
          onChangeText={(flatMultiline) =>
            inputActionHandler('flatMultiline', flatMultiline)
          }
        />
        <TextInput
          style={[styles.inputContainerStyle, styles.textArea]}
          label="Flat input text area"
          multiline
          placeholder="Type something"
          value={flatTextArea}
          onChangeText={(flatTextArea) =>
            inputActionHandler('flatTextArea', flatTextArea)
          }
        />
        <TextInput
          disabled
          style={styles.inputContainerStyle}
          label="Disabled flat input"
        />
        <TextInput
          style={styles.inputContainerStyle}
          label="Flat input with custom underline colors"
          placeholder="Type something"
          value={flatUnderlineColors}
          onChangeText={(flatUnderlineColors) =>
            inputActionHandler('flatUnderlineColors', flatUnderlineColors)
          }
          underlineColor={pink400}
          activeUnderlineColor={amber900}
        />
        <TextInput
          mode="outlined"
          style={styles.inputContainerStyle}
          label="Outlined input"
          placeholder="Type something"
          value={outlinedText}
          onChangeText={(outlinedText) =>
            inputActionHandler('outlinedText', outlinedText)
          }
          left={
            <TextInput.Icon
              name="heart"
              color={outlineLeftIcon}
              onPress={() => {
                changeIconColor('outlineLeftIcon');
              }}
            />
          }
          right={<TextInput.Affix text="/100" />}
        />
        <TextInput
          mode="outlined"
          style={[styles.inputContainerStyle, styles.fontSize]}
          label="Outlined large font"
          placeholder="Type something"
          value={outlinedLargeText}
          onChangeText={(outlinedLargeText) =>
            inputActionHandler('outlinedLargeText', outlinedLargeText)
          }
          left={<TextInput.Affix text="$" />}
          right={
            <TextInput.Icon
              name="heart"
              color={outlineRightIcon}
              onPress={() => {
                changeIconColor('outlineRightIcon');
              }}
            />
          }
        />
        <TextInput
          mode="outlined"
          style={[styles.inputContainerStyle, styles.fontSize]}
          label="Outlined large font"
          placeholder="Type something"
          value={outlinedTextPassword}
          onChangeText={(outlinedTextPassword) =>
            inputActionHandler('outlinedTextPassword', outlinedTextPassword)
          }
          secureTextEntry={outlineTextSecureEntry}
          right={
            <TextInput.Icon
              name={outlineTextSecureEntry ? 'eye' : 'eye-off'}
              onPress={() =>
                dispatch({
                  type: 'outlineTextSecureEntry',
                  payload: !outlineTextSecureEntry,
                })
              }
            />
          }
        />
        <TextInput
          mode="outlined"
          style={styles.inputContainerStyle}
          dense
          label="Dense outlined input"
          placeholder="Type something"
          value={outlinedDenseText}
          onChangeText={(outlinedDenseText) =>
            inputActionHandler('outlinedDenseText', outlinedDenseText)
          }
          left={<TextInput.Affix text="$" />}
        />
        <TextInput
          mode="outlined"
          style={styles.inputContainerStyle}
          dense
          placeholder="Dense outlined input without label"
          value={outlinedDense}
          onChangeText={(outlinedDense) =>
            inputActionHandler('outlinedDense', outlinedDense)
          }
        />
        <TextInput
          mode="outlined"
          style={styles.inputContainerStyle}
          label="Outlined input multiline"
          multiline
          placeholder="Type something"
          value={outlinedMultiline}
          onChangeText={(outlinedMultiline) =>
            inputActionHandler('outlinedMultiline', outlinedMultiline)
          }
        />
        <TextInput
          mode="outlined"
          style={[styles.inputContainerStyle, styles.textArea]}
          label="Outlined input text area"
          multiline
          placeholder="Type something"
          value={outlinedTextArea}
          onChangeText={(outlinedTextArea) =>
            inputActionHandler('outlinedTextArea', outlinedTextArea)
          }
        />
        <TextInput
          mode="outlined"
          disabled
          style={styles.inputContainerStyle}
          label="Disabled outlined input"
        />
        <TextInput
          mode="outlined"
          style={styles.inputContainerStyle}
          label="Outlined input with custom outline colors"
          placeholder="Type something"
          value={outlinedColors}
          onChangeText={(outlinedColors) =>
            inputActionHandler('outlinedColors', outlinedColors)
          }
          outlineColor={pink400}
          activeOutlineColor={amber900}
        />
        <TextInput
          mode="outlined"
          style={styles.inputContainerStyle}
          label="Outlined with super long label which is truncating at some point"
          placeholder="Type something"
          onChangeText={(outlinedLongLabel) =>
            inputActionHandler('outlinedLongLabel', outlinedLongLabel)
          }
        />
        <View style={styles.inputContainerStyle}>
          <TextInput
            label="Input with helper text"
            placeholder="Enter username, only letters"
            value={name}
            error={!_isUsernameValid(name)}
            onChangeText={(name) => inputActionHandler('name', name)}
          />
          <HelperText type="error" visible={!_isUsernameValid(name)}>
            Error: Only letters are allowed
          </HelperText>
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label="Input with helper text and character counter"
            placeholder="Enter username, only letters"
            value={maxLengthName}
            error={!_isUsernameValid(maxLengthName)}
            onChangeText={(maxLengthName) =>
              inputActionHandler('maxLengthName', maxLengthName)
            }
            maxLength={MAX_LENGTH}
          />
          <View style={styles.helpersWrapper}>
            <HelperText
              type="error"
              visible={!_isUsernameValid(maxLengthName)}
              style={styles.helper}
            >
              Error: Numbers and special characters are not allowed
            </HelperText>
            <HelperText type="info" visible style={styles.counterHelper}>
              {maxLengthName.length} / {MAX_LENGTH}
            </HelperText>
          </View>
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label="Input with no padding"
            style={styles.noPaddingInput}
            placeholder="Enter username, only letters"
            value={nameNoPadding}
            error={!_isUsernameValid(nameNoPadding)}
            onChangeText={(nameNoPadding) =>
              inputActionHandler('nameNoPadding', nameNoPadding)
            }
          />
          <HelperText
            type="error"
            padding="none"
            visible={!_isUsernameValid(nameNoPadding)}
          >
            Error: Only letters are allowed
          </HelperText>
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label={
              <Text>
                <Text style={{ color: red500 }}>*</Text> Label as component
              </Text>
            }
            style={styles.noPaddingInput}
            placeholder="Enter username, required"
            value={nameRequired}
            error={!nameRequired}
            onChangeText={(nameRequired) =>
              inputActionHandler('nameRequired', nameRequired)
            }
          />
          <HelperText type="error" padding="none" visible={!nameRequired}>
            Error: Username is required
          </HelperText>
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label="Input with text align center"
            style={styles.centeredText}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            mode="outlined"
            label="Outlined input with text align center"
            style={styles.centeredText}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            mode="outlined"
            theme={{
              roundness: 25,
            }}
            label="Outlined text input with custom roundness"
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            mode="outlined"
            label="Outlined text input without roundness"
            theme={{ roundness: 0 }}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            mode="outlined"
            label="Outlined text input with error"
            error
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            mode="outlined"
            label="Outlined multiline text input with fixed height"
            multiline
            style={styles.fixedHeight}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            mode="flat"
            label="Flat multiline text input with fixed height"
            multiline
            style={styles.fixedHeight}
          />
        </View>
        <TextInput
          style={[styles.inputContainerStyle, { height: 150 }]}
          multiline
          placeholder="Custom height, no label"
          value={flatMultilineCustomHeightNoLabel}
          onChangeText={(flatMultilineCustomHeightNoLabel) =>
            inputActionHandler(
              'flatMultilineCustomHeightNoLabel',
              flatMultilineCustomHeightNoLabel
            )
          }
        />
        <TextInput
          style={[styles.inputContainerStyle, { height: 150 }]}
          multiline
          placeholder="Custom height, no label, textAlignVertical to top"
          textAlignVertical="top"
          value={flatMultilineCustomHeightNoLabelTop}
          onChangeText={(flatMultilineCustomHeightNoLabelTop) =>
            inputActionHandler(
              'flatMultilineCustomHeightNoLabelTop',
              flatMultilineCustomHeightNoLabelTop
            )
          }
        />
        <TextInput
          mode="outlined"
          style={[styles.inputContainerStyle, { height: 150 }]}
          multiline
          placeholder="Custom height, outlined, no label"
          value={outlinedMultilineCustomHeightNoLabel}
          onChangeText={(outlinedMultilineCustomHeightNoLabel) =>
            inputActionHandler(
              'outlinedMultilineCustomHeightNoLabel',
              outlinedMultilineCustomHeightNoLabel
            )
          }
        />
      </ScreenWrapper>
    </TextInputAvoidingView>
  );
};

TextInputExample.title = 'TextInput';

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    margin: 8,
  },
  fontSize: {
    fontSize: 32,
  },
  textArea: {
    height: 80,
  },
  noPaddingInput: {
    backgroundColor: transparent,
    paddingHorizontal: 0,
  },
  centeredText: {
    textAlign: 'center',
  },
  fixedHeight: {
    height: 100,
  },
});

export default TextInputExample;

import { View, Modal, Text, Platform } from 'react-native';
import React,{useState} from 'react'
import { themes } from '../contexts/theme';
import { useTheme } from '../contexts/ThemeContext';
import Button from './Buttons/Button';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import Icon from "react-native-vector-icons/FontAwesome5"
import dayjs from "dayjs"



const InputsView = () => {


  

  const {theme} = useTheme()
  // const [date, setDate] = useState(new Date())


  const calendarCssClass = {
    today: 'border-amber-500 bg-blue-500 rounded-full ', // Add a border to today's date
    today_label:`${themes[theme].buttonText}`,
    day_label:`text-base> font-semibold ${themes[theme].textPrimary}`,
    day: ` hover:bg-amber-100 `, // Change background color on hover
    weekday_label:`text-base font-semibold ${themes[theme].textPrimary} `,
    // weekdays:`${theme === "light" ? 'bg-white' : 'bg-neutral-700'} shadow-lg h-30 rounded-lg`,
    months_label:`text-base font-semibold ${themes[theme].buttonText }`,
    month_selector_label:`text-base font-semibold ${themes[theme].textPrimary }`,
    year_selector:`text-base font-semibold ${themes[theme].textPrimary }`,
    year_selector_label:`text-base font-semibold ${themes[theme].textPrimary }`,
    year_label:`text-base font-semibold ${themes[theme].textPrimary }`,
    months:`text-red-500 bg-red-500`,
    month_label:`${themes[theme].buttonText}`,
    time_selector_label:`${themes[theme].buttonText}`,
    time_selector:`${themes[theme].textPrimary}`,
    time_selector_label:`${themes[theme].textPrimary} text-base font-semibold`,
    time_label:`${themes[theme].textPrimary}`,
    time_selected_indicator:`${themes[theme].textPrimary} bg-neutral-500/10 raunded`,
    selected: `bg-amber-500 border-ambeter-500 text-white`, // Highlight the selected day
    selected_label: `${themes[theme].buttonText}`, // Highlight the selected day label
    header:`${theme === "light" ? 'bg-white' : 'bg-neutral-700'} shadow-lg h-30 rounded-lg `,
    
  }

  const [show, setShow] = useState(false);

  const today = new Date();
  const [selected, setSelected] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date())

  const handleDateChange = ({ date }) => {
    if (date instanceof Date) {
      setSelected(date);
      setSelectedTime(date)
    } else {
      // console.error('Invalid date:', date);
    }
  };



  return (
      <View className="p-3">

      <Text className={`${themes[theme].textPrimary}`}>{theme}</Text>
      <View className="flex-row gap-3 mb-10">
        <Text className={`text-2xl font-bold ${themes[theme].textPrimary}`}>Date:</Text>
        <Text className={`text-2xl font-bold ${themes[theme].textPrimary}`}>{selected ? dayjs(selected).format('DD-MM-YY') : 'No Date Selected'}</Text>
      </View>

      <View className="flex-row gap-3 ">
        <Text className={`text-2xl font-bold ${themes[theme].textPrimary}`}>Time:</Text>
        <Text className={`text-2xl font-bold ${themes[theme].textPrimary}`}> {dayjs(selectedTime).format('HH:mm A')}</Text>
      </View>
     
      <Button variant="filled" size='medium' title="Calendar" onPress={() => setShow(true)} />
      <Modal visible={show} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding:12 }}>
          <View className={`${themes[theme].bgPrimary}`} style={{  borderRadius: 10, padding: 20,margin:10 }}>
            <DateTimePicker
                      firstDayOfWeek={1}
                      timePicker={selectedTime}
                      onChange={handleDateChange}
                      mode="single"
                      classNames={{...calendarCssClass}}           
            />
            <View className="flex-row gap-2 justify-between mt-5 ">
                <Button   title="Cancel" onPress={() => setShow(false)} className='w-1/2 bg-neutral-600' />
                <Button title="Confirm" onPress={() => setShow(false)} className='w-1/2' />
            </View>
         </View>


        </View>
      </Modal>

    </View>
  )
}



export default InputsView
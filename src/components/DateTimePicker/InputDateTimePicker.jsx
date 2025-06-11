import {View, Modal,Text, TextInput, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { themes } from '../../contexts/theme';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../Buttons/Button';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import dayjs from 'dayjs';


const InputDateTimePicker = ({pickerType="calendar", isValidation=false, onDateChange, onTimeChange }) => {

    // for PickerType = "calendar"
    // for PickerType = "calendarTime"
    const {theme} = useTheme();
    const [show, setShow] = useState(false);    // MODEL DAILOG OPEN State 

    const initialDate = new Date()

    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [selectedTime, setSelectedTime] = useState(null)


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
        time_selected_indicator:`${themes[theme].textPrimary} bg-neutral-500/10 rounded-lg`,
        selected: `bg-amber-500 border-ambeter-500 text-white rounded-full`, // Highlight the selected day
        selected_label: `${themes[theme].buttonText} rounded-full`, // Highlight the selected day label
        header:`${theme === "light" ? 'bg-white' : 'bg-neutral-700'} shadow-lg h-30 rounded-lg `,
        
    }

    
    useEffect(() => {
      if (initialDate) setSelectedDate(new Date(initialDate));
    },[])

   

  


    const handleOpenCalendarDailog = () => {
      setShow(true)
    }





    
    const handleDateChange = ({ date,time }) => {
      if (date instanceof Date) {
        setSelectedDate(new Date(date));
        setShow(false);
      
        if(onDateChange) {
          //  onDateChange(dayjs(date).format('MMMM D, YYYY') ,)
          onDateChange(dayjs(new Date(date)))
        }
        
      }
    };

    const handleTimeChange = ({date}) => {
      if (date instanceof Date) {
        setSelectedTime(date)
        setShow(false);
      
        if(onTimeChange) {
           onTimeChange( dayjs(date).format('HH:mm') )
        }
        
      }
    }



  return (
    <>
    <View className="relative">
      {/* <View className="">
         <Text className={`text-lg font-normal ${themes[theme].formLabel} mb-2 mx-6`}>Please Select Date</Text>
      </View> */}
      {
       pickerType === "calendar" &&  
        <TouchableOpacity onPress={handleOpenCalendarDailog}
        className={`flex-row items-center justify-between  h-[50px] px-5  rounded-full   ${themes[theme].bgPrimary}  border  ${themes[theme].border}   text-base font-medium`}>
         <TextInput  className={`text-lg font-normal ${themes[theme].formInput}  `}
          placeholderTextColor={`${theme === "light" ? 'black' : '#fff5'}`}
         value={selectedDate ? dayjs(selectedDate).format('MMMM D, YYYY') : ''}
         placeholder='Please select date'  editable={false} >
           </TextInput>
           <Text className={`${themes[theme].formInput}`}><Icon name='calendar' size={18}  /></Text>
        </TouchableOpacity>
        }

        {
        
        pickerType === "calendarTime" &&
          <TouchableOpacity onPress={handleOpenCalendarDailog}
            className={`flex-row items-center justify-between  h-[50px] px-5  rounded-full   ${themes[theme].bgPrimary}  border  ${themes[theme].border}   text-base font-medium`}>
            <TextInput className={`text-lg font-normal ${themes[theme].formInput}  `}
              placeholderTextColor={`${theme === "light" ? '#9ca3af' : '#9ca3af'}`}
              value={selectedTime ? dayjs(selectedTime).format('HH:mm') : ''}
              placeholder='Please select date' editable={false} >
            </TextInput>
            <Text className={`${themes[theme].formInput}`}><Icon name='calendar' size={18} /></Text>
          </TouchableOpacity>
        }
        {isValidation && <Text className="px-6 absolute bottom-0 text-red-500" >Please check valid Date and Time</Text>}
    </View>
     <Modal visible={show} transparent animationType="fade">
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 12 }}>
            <View className={`${themes[theme].bgPrimary}`} style={{ borderRadius: 10, padding: 20, margin: 10 }}>
              {
                pickerType === "calendar" &&   <DateTimePicker
                placeholder="please select date"
                firstDayOfWeek={1}
                date={selectedDate || new Date()}
                onChange={handleDateChange}
                mode="single"
                classNames={{ ...calendarCssClass }}
              />

              }
              {
                pickerType === "calendarTime" &&   <DateTimePicker
                placeholder="please select date"
                firstDayOfWeek={1}
                timePicker={selectedTime || new Date()}
                onChange={handleTimeChange}
                mode="single"
                classNames={{ ...calendarCssClass }}
              />

              }
              {/* <View className="flex-row gap-2 justify-between mt-5 " ${themes[theme].bgPrimary}>
                <Button title="Cancel" onPress={() => setShow(false)} className='w-1/2 bg-neutral-600' />
                <Button title="Confirm" onPress={() => setShow(false)} className='w-1/2' />
              </View> */}
            </View>


          </View>
   </Modal>
   </>
  )
}

export default InputDateTimePicker
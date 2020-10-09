import loadable from "@loadable/component";
var fistLetterUpper = function(str) {
  return str.charAt(0).toUpperCase()+str.slice(1);
};
const DynamicIcon = loadable(props =>{
  let iconType = ""
  if(props.type.includes("Outlined")){
    iconType = props.type
  }else {
    iconType = fistLetterUpper(props.type) + "Outlined"
  }
  // alert(iconType)
  // let iconType = fistLetterUpper(props.type)
  return import(`@ant-design/icons/es/icons/${iconType}.js`)
    .catch(err => import(`@ant-design/icons/es/icons/WarningOutlined.js`))
})

export default DynamicIcon;

import Vue from 'vue'
import {
  Container,
  Icon,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Button,
  Form,
  FormItem,
  Input,
  Carousel,
  CarouselItem,
  Pagination,
  Select,
  Option,
  DatePicker,
  Message,
  Dialog,
  Row,
  Col,
  Steps,
  Step,
  Upload,
  Radio,
  RadioGroup,
  RadioButton
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [
  Container,
  Icon,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Button,
  Form,
  FormItem,
  Input,
  Carousel,
  CarouselItem,
  Pagination,
  Select,
  Option,
  DatePicker,
  Message,
  Dialog,
  Row,
  Col,
  Steps,
  Step,
  Upload,
  Radio,
  RadioGroup,
  RadioButton
];

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
Vue.prototype.$message = Message
Vue.use(Element, { locale })
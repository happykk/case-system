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
  DatePicker
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
  DatePicker
];

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

Vue.use(Element, { locale })
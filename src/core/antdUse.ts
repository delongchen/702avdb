import { App } from 'vue'

import {
  Button,
  List,
  Modal,
  Form,
  Input,
  Menu,
  Layout,
  BackTop,
  Card,
  Image,
  Dropdown,
  Collapse,
  Tag
} from 'ant-design-vue'

function antdUse(app: App<Element>): void {
  app.use(Collapse)
  app.use(Button)
  app.use(List)
  app.use(Modal)
  app.use(Form)
  app.use(Input)
  app.use(Menu)
  app.use(Layout)
  app.use(BackTop)
  app.use(Card)
  app.use(Image)
  app.use(Dropdown)
  app.use(Tag)
}

export default antdUse

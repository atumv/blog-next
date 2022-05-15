import * as yup from 'yup';
import { tags } from './constants';

export const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().required(),
  tag: yup.mixed().oneOf(tags),
});

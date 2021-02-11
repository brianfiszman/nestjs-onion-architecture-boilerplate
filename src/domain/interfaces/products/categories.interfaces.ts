import { Regions, Sources } from '../../enums';

export interface Categories {
  _id: string;
  region: Regions;
  src: Sources;
  children: CategoryTree[];
}

interface CategoryLink {
  uri: string;
}

export interface CategoryTree {
  name: string;
  link: CategoryLink;
  children?: Children[];
}

export interface Children {
  name: string;
  code: string;
  nutriscore: string;
  main_attr: string;
  link: CategoryLink;
}

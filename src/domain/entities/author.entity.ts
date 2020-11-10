import { Cascade, Collection, Entity, OneToMany, Property, ManyToOne } from '@mikro-orm/core';

import { Book } from '.';
import { BaseEntity } from './base.entity';

@Entity()
export class Author extends BaseEntity {
  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  age?: number;

  @Property()
  termsAccepted?: boolean;

  @Property()
  born?: Date;

  @OneToMany(() => Book, b => b.author, { cascade: [Cascade.ALL] })
  books = new Collection<Book>(this);

  @ManyToOne(() => Book)
  favouriteBook?: Book;

  constructor(
    name: string,
    email: string,
    age?: number,
    termsAccepted?: boolean,
    born?: Date | undefined,
    favouriteBook?: Book | undefined
  ) {
    super();
    this.name = name;
    this.email = email;
    this.age = age;
    this.termsAccepted = termsAccepted || false;
    this.born = born;
    this.favouriteBook = favouriteBook;
  }
}

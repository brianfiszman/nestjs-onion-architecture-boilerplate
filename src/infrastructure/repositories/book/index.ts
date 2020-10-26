import { EntityRepository, Repository } from '@mikro-orm/core';
import { Book } from '../../../domain/entities/Book';

@Repository(Book)
export class BookRepository extends EntityRepository<Book> {}

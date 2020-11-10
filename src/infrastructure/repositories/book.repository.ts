import { EntityRepository, Repository } from '@mikro-orm/core';
import { Book } from '../../domain/entities/';

@Repository(Book)
export class BookRepository extends EntityRepository<Book> {}

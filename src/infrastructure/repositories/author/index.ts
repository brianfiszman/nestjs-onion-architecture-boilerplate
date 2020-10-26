import { EntityRepository, Repository } from '@mikro-orm/core';
import { Author } from '../../../domain/entities/Author';

@Repository(Author)
export class AuthorRepository extends EntityRepository<Author> {}

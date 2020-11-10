import { EntityRepository, Repository } from '@mikro-orm/core';
import { Author } from '../../domain/entities';

@Repository(Author)
export class AuthorRepository extends EntityRepository<Author> {}

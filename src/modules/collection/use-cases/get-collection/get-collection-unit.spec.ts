import { randomUUID } from 'node:crypto';
import { scryfallCard, scryfallSet } from '../../../../tests/mocks/scryfall';
import { InMemoryCardsRepository } from '../../../cards/repository/in-memory-collections-repository';
import { InMemoryScryfallRepository } from '../../../scryfall/repositories/in-memory-scryfall-repository';
import { InMemoryCollectionsRepository } from '../../repositories/in-memory-collections-repository';
import { GetCollectionUseCase } from './get-collection-use-case';

describe('[unit] Get collection', () => {
  let collectionsRepository: InMemoryCollectionsRepository;
  let cardsRepository: InMemoryCardsRepository;
  let scryfallRepository: InMemoryScryfallRepository;
  let getCollectionUseCase: GetCollectionUseCase;

  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository();
    collectionsRepository = new InMemoryCollectionsRepository(cardsRepository);
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard, scryfallSet);
    getCollectionUseCase = new GetCollectionUseCase(collectionsRepository, scryfallRepository);
  });

  it('should be able to list user cards', async () => {
    const userId = randomUUID();

    const { id: collectionId } = await collectionsRepository.create(userId);

    await cardsRepository.addCard({
      quantity: 1,
      scryfallCardId: scryfallCard.id,
      collectionId,
    });

    const userCards = await getCollectionUseCase.execute(userId);

    expect(userCards.length).toBe(1);
  });

  it('should be able to get user collection with no cards', async () => {
    const userId = randomUUID();

    await collectionsRepository.create(userId);

    const userCards = await getCollectionUseCase.execute(userId);

    expect(userCards).toHaveLength(0);
  });
});

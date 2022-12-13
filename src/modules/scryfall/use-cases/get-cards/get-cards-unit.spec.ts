import { scryfallCard } from '../../../../tests/mocks/card';
import { InMemoryScryfallRepository } from '../../repositories/in-memory-scryfall-repository';
import { GetCardsUseCase } from './get-cards-use-case';

describe('[unit] Get cards by name', () => {
  let scryfallRepository: InMemoryScryfallRepository;
  let getCardsUseCase: GetCardsUseCase;

  beforeEach(() => {
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard);
    getCardsUseCase = new GetCardsUseCase(scryfallRepository);
  });

  it('should be able to get a list of cards', async () => {
    const findCardsByNameSpy = jest.spyOn(scryfallRepository, 'findCardsByName');
    const cards = await getCardsUseCase.execute({ name: 'card' });

    expect(cards).toHaveLength(1);
    expect(findCardsByNameSpy).toHaveBeenCalled();
    expect(cards.shift()?.name).toBe(scryfallCard.name);
  });

  it('should not be able to get a cards without a name', async () => {
    const findCardsByNameSpy = jest.spyOn(scryfallRepository, 'findCardsByName');
    await expect(getCardsUseCase.execute({ name: '' }))
      .rejects
      .toThrow('You need to provide a card name');

    expect(findCardsByNameSpy).not.toHaveBeenCalled();
  });
});

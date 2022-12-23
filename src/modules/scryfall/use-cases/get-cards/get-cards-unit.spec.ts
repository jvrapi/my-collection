import { scryfallCard, scryfallSet } from '../../../../tests/mocks/scryfall';
import { Types } from '../../../../types/card-types';
import { InMemoryScryfallRepository } from '../../repositories/in-memory-scryfall-repository';
import { GetCardsUseCase } from './get-cards-use-case';

describe('[unit] Get cards by name', () => {
  let scryfallRepository: InMemoryScryfallRepository;
  let getCardsUseCase: GetCardsUseCase;

  beforeEach(() => {
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard, scryfallSet);
    getCardsUseCase = new GetCardsUseCase(scryfallRepository);
  });

  it('should be able to get a list of cards filtering by name', async () => {
    const findCardsByNameSpy = jest.spyOn(scryfallRepository, 'findCardsByName');
    const cards = await getCardsUseCase.execute({ name: 'card' });

    expect(cards).toHaveLength(1);
    expect(findCardsByNameSpy).toHaveBeenCalled();
    expect(cards.shift()?.name).toBe(scryfallCard.name);
  });

  it('should be able to get a list of cards filtering by set code', async () => {
    const findCardsBySetCodeSpy = jest.spyOn(scryfallRepository, 'findCardsBySetCode');
    const cards = await getCardsUseCase.execute({ setCode: scryfallSet.code });

    expect(cards).toHaveLength(1);
    expect(findCardsBySetCodeSpy).toHaveBeenCalled();
    expect(cards.shift()).toBe(scryfallCard);
  });

  it('should be able to get a list of cards filtering by card type', async () => {
    const findCardByCardTypeSpy = jest.spyOn(scryfallRepository, 'findCardsByCardType');
    const cards = await getCardsUseCase.execute({
      cardType: [Types.Artifact]
    });

    expect(cards).toHaveLength(1);
    expect(findCardByCardTypeSpy).toHaveBeenCalled();
    expect(cards.shift()).toBe(scryfallCard);
  });

  it('should not be able to get a list of cards without an filter', async () => {
    const findCardsByNameSpy = jest.spyOn(scryfallRepository, 'findCardsByName');

    await expect(getCardsUseCase.execute({ }))
      .rejects
      .toThrow();

    expect(findCardsByNameSpy).not.toHaveBeenCalled();
  });
});

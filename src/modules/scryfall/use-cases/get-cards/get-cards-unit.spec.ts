import { PaginationProvider } from '../../../../providers/pagination/pagination-provider';
import { scryfallCard, scryfallSet } from '../../../../tests/mocks/scryfall';
import { Types } from '../../../../types/card-types';
import { InMemoryScryfallRepository } from '../../repositories/in-memory-scryfall-repository';
import { GetCardsUseCase } from './get-cards-use-case';

describe('[unit] Get cards by name', () => {
  let scryfallRepository: InMemoryScryfallRepository;
  let getCardsUseCase: GetCardsUseCase;
  let pagination: PaginationProvider;

  beforeEach(() => {
    pagination = new PaginationProvider();
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard, scryfallSet);
    getCardsUseCase = new GetCardsUseCase(scryfallRepository, pagination);
  });

  it('should be able to get a random list of cards', async () => {
    const getRandomCardsSpy = jest.spyOn(scryfallRepository, 'getRandomCards');
    const findCardsByNameSpy = jest.spyOn(scryfallRepository, 'findCardsByName');
    const findCardsBySetCodeSpy = jest.spyOn(scryfallRepository, 'findCardsBySetCode');
    const findCardByCardTypeSpy = jest.spyOn(scryfallRepository, 'findCardsByCardType');

    const cards = await getCardsUseCase.execute({ page: 1 });

    expect(cards.items).toHaveLength(1);
    expect(getRandomCardsSpy).toHaveBeenCalled();
    expect(findCardsByNameSpy).not.toHaveBeenCalled();
    expect(findCardsBySetCodeSpy).not.toHaveBeenCalled();
    expect(findCardByCardTypeSpy).not.toHaveBeenCalled();
    expect(cards.items.shift()?.name).toBe(scryfallCard.name);
  });

  it('should be able to get a list of cards filtering by name', async () => {
    const findCardsByNameSpy = jest.spyOn(scryfallRepository, 'findCardsByName');
    const cards = await getCardsUseCase.execute({ name: 'card', page: 1 });

    expect(cards.items).toHaveLength(1);
    expect(findCardsByNameSpy).toHaveBeenCalled();
    expect(cards.items.shift()?.name).toBe(scryfallCard.name);
  });

  it('should be able to get a list of cards filtering by set code', async () => {
    const findCardsBySetCodeSpy = jest.spyOn(scryfallRepository, 'findCardsBySetCode');
    const cards = await getCardsUseCase.execute({ setCode: scryfallSet.code, page: 1 });

    expect(cards.items).toHaveLength(1);
    expect(findCardsBySetCodeSpy).toHaveBeenCalled();
    expect(cards.items.shift()).toBe(scryfallCard);
  });

  it('should be able to get a list of cards filtering by card type', async () => {
    const findCardByCardTypeSpy = jest.spyOn(scryfallRepository, 'findCardsByCardType');
    const cards = await getCardsUseCase.execute({
      cardType: [Types.Artifact],
      page: 1
    });

    expect(cards.items).toHaveLength(1);
    expect(findCardByCardTypeSpy).toHaveBeenCalled();
    expect(cards.items.shift()).toBe(scryfallCard);
  });
});

import { TestBed } from '@angular/core/testing';
import { SafeDataSourcePipe } from './safe-data-source.pipe';
import { SafeDataSourceModule } from './safe-data-source.module'; 

describe('SafeDataSourcePipe', () => {
  let pipe: SafeDataSourcePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafeDataSourcePipe]
    });
    pipe = TestBed.inject(SafeDataSourcePipe);
  });

  it('should return the input value if it is not falsy', () => {
    const value = { data: 'some data' };
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toBe(value);
  });

  it('should return an empty array if the input value is falsy', () => {
    const falsyValues = [null, undefined, '', 0, false];
    for (const falsyValue of falsyValues) {
      const transformedValue = pipe.transform(falsyValue);
      expect(transformedValue).toEqual([]);
    }
  });
});

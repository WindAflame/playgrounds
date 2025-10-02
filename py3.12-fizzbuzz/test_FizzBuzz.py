from FizzBuzz import FizzBuzz


class TestFizzBuzz:

    def test_1is1(self):
        assert FizzBuzz.of(1) == '1'

    def test_2is2(self):
        assert FizzBuzz.of(2) == '2'

    def test_3isFizz(self):
        assert FizzBuzz.of(3) == 'Fizz'

    def test_5isBuzz(self):
        assert FizzBuzz.of(5) == 'Buzz'

    def test_6isFizz(self):
        assert FizzBuzz.of(6) == 'Fizz'

    def test_7is7(self):
        assert FizzBuzz.of(7) == '7'

    def test_8is8(self):
        assert FizzBuzz.of(8) == '8'

    def test_9is9(self):
        assert FizzBuzz.of(9) == 'Fizz'

    def test_10is10(self):
        assert FizzBuzz.of(10) == 'Buzz'

    def test_11is11(self):
        assert FizzBuzz.of(11) == '11'

    def test_12isFizz(self):
        assert FizzBuzz.of(12) == 'Fizz'

    def test_13is13(self):
        assert FizzBuzz.of(13) == '13'

    def test_14is14(self):
        assert FizzBuzz.of(14) == '14'

    def test_15isFizzBuzz(self):
        assert FizzBuzz.of(15) == 'FizzBuzz'
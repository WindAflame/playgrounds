class FizzBuzz:

    # Step 0
    # @staticmethod
    # def of(i: int) -> str:
    #     return str(i)

    # Step 1
    # @staticmethod
    # def of(i: int) -> str:
    #     if i == 3:
    #         return "Fizz"
    #     return str(i)

    # Step 2
    # @staticmethod
    # def of(i: int) -> str:
    #     if i == 3:
    #         return "Fizz"
    #     if i == 5:
    #         return "Buzz"
    #     return str(i)

    # Step 3
    # @staticmethod
    # def of(i: int) -> str:
    #     if i % 3 == 0:
    #         return "Fizz"
    #     if i == 5:
    #         return "Buzz"
    #     return str(i)

    # # Step 4
    # @staticmethod
    # def of(i: int) -> str:
    #     if i % 3 == 0:
    #         return "Fizz"
    #     if i % 5 == 0:
    #         return "Buzz"
    #     return str(i)

    # Step 5
    @staticmethod
    def of(i: int) -> str:
        result = ''
        if i % 3 == 0:
            result += "Fizz"
        if i % 5 == 0:
            result += "Buzz"
        if not result:
            return str(i)
        return result
    
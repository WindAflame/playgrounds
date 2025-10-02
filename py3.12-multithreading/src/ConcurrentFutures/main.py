import concurrent.futures
import time

from Tasks.task1 import say_after, say_after_return

def main():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    # Utilisation d'un ThreadPoolExecutor pour exécuter les tâches de manière asynchrone
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future1 = executor.submit(say_after, delay, message1)
        future2 = executor.submit(say_after, delay*2, message2)

        print(f"started at {time.strftime('%X')}")

    print(f"finished at {time.strftime('%X')}")


def main_with_result():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    # Utilisation d'un ThreadPoolExecutor pour exécuter les tâches de manière asynchrone
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future1 = executor.submit(say_after_return, delay, message1)
        future2 = executor.submit(say_after_return, delay*2, message2)

        print(f"started at {time.strftime('%X')}")

        result1 = future1.result()
        print(result1)

        result2 = future2.result()
        print(result2)

    print(f"finished at {time.strftime('%X')}")


def main_wait_results():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    # Utilisation d'un ThreadPoolExecutor pour exécuter les tâches de manière asynchrone
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future1 = executor.submit(say_after_return, delay, message1)
        future2 = executor.submit(say_after_return, delay*2, message2)

        print(f"started at {time.strftime('%X')}")

        result1 = future1.result()
        result2 = future2.result()

        print(result1)
        print(result2)

    print(f"finished at {time.strftime('%X')}")


if __name__ == '__main__':
    main()
    main_with_result()
    main_wait_results()

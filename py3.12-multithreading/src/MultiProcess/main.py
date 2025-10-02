import multiprocessing
import time

from Tasks.task1 import say_after, say_after_return

def main():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    process1 = multiprocessing.Process(target=say_after, args=(delay, message1))
    process2 = multiprocessing.Process(target=say_after, args=(delay*2, message2))

    print(f"started at {time.strftime('%X')}")

    # Start the multiprocesses
    process1.start()
    process2.start()

    # Wait for the subprocesses to finish
    process1.join()
    process2.join()

    print(f"finished at {time.strftime('%X')}")



def main_with_result():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    # Create a Pool
    pool = multiprocessing.Pool()

    print(f"started at {time.strftime('%X')}")

    # Start the asynchronous multiprocesses
    result1 = pool.apply_async(say_after_return, args=(delay, message1))
    result2 = pool.apply_async(say_after_return, args=(delay*2, message2))

    # Draw results
    print(result1.get())
    print(result2.get())

    pool.close()
    pool.join()

    print(f"finished at {time.strftime('%X')}")



def main_wait_results():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    print(f"started at {time.strftime('%X')}")

    with multiprocessing.Pool() as pool:
        result1 = pool.apply(say_after_return, (delay, message1))
        result2 = pool.apply(say_after_return, (delay*2, message2))
        
        print(result1)
        print(result2)

    print(f"finished at {time.strftime('%X')}")

if __name__ == '__main__':
    main()
    main_with_result()
    main_wait_results()
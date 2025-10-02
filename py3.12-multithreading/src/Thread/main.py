import threading
import time

from Tasks.task1 import say_after, say_after_return, say_after_results

def main():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    # Create thread to draw in two part our message
    thread1 = threading.Thread(target=say_after, args=(delay,message1))
    thread2 = threading.Thread(target=say_after, args=(delay*2,message2))

    print(f"started at {time.strftime('%X')}")

    thread1.start()
    thread2.start()
    
    thread1.join()
    thread2.join()

    print(f"finished at {time.strftime('%X')}")



def main_with_result():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"
    results =  []

    # Create thread to draw in two part our message
    thread1 = threading.Thread(target=say_after_results, args=(delay,message1,results))
    thread2 = threading.Thread(target=say_after_results, args=(delay*2,message2,results))

    print(f"started at {time.strftime('%X')}")

    thread1.start()    
    thread1.join()
    print(results[0])

    thread2.start()
    thread2.join()
    print(results[1])

    print(f"finished at {time.strftime('%X')}")



def main_wait_results():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"
    threads = []
    results =  []

    # Create thread to draw in two part our message
    threads.append(threading.Thread(target=say_after_results, args=(delay,message1,results)))
    threads.append(threading.Thread(target=say_after_results, args=(delay*2,message2,results)))

    print(f"started at {time.strftime('%X')}")

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()
           
    print(results)

    print(f"finished at {time.strftime('%X')}")

if __name__ == '__main__':
    main()
    main_with_result()
    main_wait_results()
import asyncio
import time

from Tasks.task1 import async_say_after, async_say_after_return


async def main():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    print(f"started at {time.strftime('%X')}")

    # Start the coroutines
    task1 = asyncio.create_task(async_say_after(delay, message1))
    task2 = asyncio.create_task(async_say_after(delay*2, message2))

    # Wait for the coroutines to finish
    await task1
    await task2
    
    print(f"finished at {time.strftime('%X')}")

async def main_with_result():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"
    
    print(f"started at {time.strftime('%X')}")

    # Start the coroutines
    task1 = asyncio.create_task(async_say_after_return(delay, message1))
    task2 = asyncio.create_task(async_say_after_return(delay*2, message2))

    # Wait for the coroutines to finish
    await task1
    print(task1.result())
    await task2
    print(task2.result())

    print(f"finished at {time.strftime('%X')}")


async def main_wait_results():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    tasks = [
        asyncio.create_task(async_say_after_return(delay, message1)),
        asyncio.create_task(async_say_after_return(delay*2, message2))
    ]

    print(f"started at {time.strftime('%X')}")

    # Wait results
    results = await asyncio.gather(*tasks)

    for result in results:
        print(result)
    
    print(f"finished at {time.strftime('%X')}")


if __name__ == '__main__':
    asyncio.run(main())
    asyncio.run(main_with_result())
    asyncio.run(main_wait_results())

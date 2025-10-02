import asyncio
from time import sleep

async def async_say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)
async def async_say_after_return(delay, what):
    await asyncio.sleep(delay)
    return what

def say_after(delay, what):
    sleep(delay)
    print(what)

def say_after_return(delay, what) -> any:
    sleep(delay)
    return what

def say_after_results(delay, what, results: list) -> any:
    sleep(delay)
    results.append(what)
import concurrent.futures
import subprocess
import time


def main():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    print(f"started at {time.strftime('%X')}")

    # Start the subprocesses
    process1 = subprocess.Popen(["python3.11", "-c", f"import time; time.sleep({delay}); print('{message1}')"])
    process2 = subprocess.Popen(["python3.11", "-c", f"import time; time.sleep({delay*2}); print('{message2}')"])

    # Wait for the subprocesses to finish
    process1.wait()
    process2.wait()

    print(f"finished at {time.strftime('%X')}")



def main_with_result():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    print(f"started at {time.strftime('%X')}")

    # Start the subprocesses
    command1 = ["python3.11", "-c", f"import time; time.sleep({delay}); print('{message1}')"]
    process1 = subprocess.Popen(command1, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    command2 = ["python3.11", "-c", f"import time; time.sleep({delay*2}); print('{message2}')"]
    process2 = subprocess.Popen(command2, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # Wait for the subprocesses to finish
    output1, error1 = process1.communicate()
    print(output1.decode())
    output2, error2 = process2.communicate()
    print(output2.decode())

    print(f"finished at {time.strftime('%X')}")



def execute_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = process.communicate()
    return output.decode()



def main_wait_results():
    delay = 1
    message1 = "Hello,"
    message2 = "World!"

    commands = [
        ["python3.11", "-c", f"import time; time.sleep({delay}); print('{message1}')"],
        ["python3.11", "-c", f"import time; time.sleep({delay*2}); print('{message2}')"]
    ]

    with concurrent.futures.ProcessPoolExecutor() as executor:
        results = [executor.submit(execute_command, cmd) for cmd, message in zip(commands, [message1, message2])]

        print(f"started at {time.strftime('%X')}")

        for result in concurrent.futures.as_completed(results):
            print(result.result())

        print(f"finished at {time.strftime('%X')}")

if __name__ == '__main__':
    main()
    main_with_result()
    main_wait_results()
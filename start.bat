
cd geth 
@REM start geth attach \\.\pipe\geth.ipc --exec miner.start(1)
@REM start geth attach \\.\pipe\geth.ipc
start /i geth --datadir ./ --networkid 1547 --http --http.corsdomain "*" --allow-insecure-unlock --http.api="eth,net,web3,personal" 
timeout 5
start /ik geth attach \\.\pipe\geth.ipc --exec miner.start(1)
start geth attach \\.\pipe\geth.ipc
start npm start



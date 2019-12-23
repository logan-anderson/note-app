mkdir -p credentials
# touch credentials/credentials.js
cat  << EOF > temp.cred
module.exports = {
    local: false,
    useUri: true,
    uri: '$mongo_db_URI',
    userName: '',
    password: '',
    clusterName: '',
    dev: '',
    prod: '',
} 
EOF
cat temp.cred
cp temp.cred ./credentials/credentials.js
rm temp.cred
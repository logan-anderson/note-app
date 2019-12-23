mkdir -p credentials
# touch credentials/credentials.js
cat  << EOF > temp.cred
module.exports = {
    local: false,
    useUri: true,
    uri: '$1',
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
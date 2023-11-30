if [ $# -ne 1 ] 
then
    echo "Usage: $0 <path>"
    exit 1
fi

rm -rf screenshots/$1_*.png
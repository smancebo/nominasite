using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace utilities
{


    public class Security
    {
        public static string createPassword(string pass)
        {
            string password = "";

            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] hashDataByte = Encoding.Default.GetBytes(pass);
            password = Convert.ToBase64String(md5.ComputeHash(hashDataByte));

            return password;

        }

        public static string ROT13(string value)
        {
            char[] array = value.ToLower().ToCharArray();

            for (int i = 0; i <= array.Length - 1; i++)
            {

                int number = (int)array[i];

                if (number >= 'a' && number <= 'z')
                {
                    if (number > 'm')
                    {
                        number -= 13;
                    }
                    else
                    {
                        number += 13;
                    }
                }

                array[i] = (char)number;
            }
            return new string(array);
        }

        public static string createToken(string username, string password)
        {
            string token = "";
            token = ROT13(createPassword(username) + createPassword(password)).Substring(10,20);
            return token;
        }

        public static bool isValidToken(string username, string password, string token)
        {
            bool valid = false;

            if(token == createToken(username,password))
            {
                valid = true;
            }

            return valid;
        }

    }

    
}

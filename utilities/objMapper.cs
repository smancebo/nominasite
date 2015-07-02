using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

namespace utilities
{
    public class objMapper
    {
        public static void Map<T>(ref T origen, object to)
        {
            Type type = typeof(T);
            Type typeTo = to.GetType();

            PropertyInfo[] props = type.GetProperties();

            foreach (PropertyInfo prop in props)
            {
                try
                {
                    PropertyInfo p = typeTo.GetProperty(prop.Name);
                    prop.SetValue(origen, p.GetValue(to));
                }
                catch{}
            }
        }
    }
}
